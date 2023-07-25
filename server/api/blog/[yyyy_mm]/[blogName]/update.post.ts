import fs from 'fs'
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified'
import pQueue from 'p-queue';

const queue = new pQueue({ concurrency: 1 });

async function modifyMarkDownContent(filePath: string, field: IBlogInfo, content: string) {
  const newContent = matter.stringify(content, field);
  await queue.add(async () => {
    fs.writeFileSync(filePath, newContent);
  })
  return newContent;
}

export default defineEventHandler(async (event) => {
  
  if (!event.context.authBackstage) {
    throw createError({
      statusCode: 401,
      message: 'You don\'t have the rights to access this resource',
    })
  }

  if (!event.context.params) {
    throw createError({
      statusCode: 400,
      message: 'Invalid request',
    })
  }

  const logger = useLogger()
  const runtimeConfig = useRuntimeConfig()
  const blogDir = runtimeConfig.blogsContentDir
  const body: IBlog = await readBody(event)

  const { yyyy_mm, blogName } = event.context.params
  const blogContent = body.content || ''
  delete body.content

  const paramBlogName = decodeURIComponent(blogName)
  const titleConvertName = body.title
    .replace(/\s+/g, '-')   // 將所有的空格替換成破折號
    .replace(/[^\w\s一-龥]/g, '-') // 移除所有非字母、非數字、非中文和非破折號的字符
    .replace(/-+/g, '-')    // 將多個連續的破折號替換成一個
    .replace(/^-|-$/g, ''); // 移除開頭和結尾的破折號
    
  const oldFilePath = getBlogsContentFullDir(yyyy_mm, `${paramBlogName}.md`)
  const filePath = getBlogsContentFullDir(yyyy_mm, `${titleConvertName}.md`)

  

  if (oldFilePath !== filePath) {

    // check if blog exists and file name is not the same
    if (fs.existsSync(filePath)) {
      logger.http('Blog already exists.')
      throw createError({
        statusCode: 400,
        statusMessage: 'Blog already exists.'
      })
    }
  
    logger.info('rename file: '+ `${oldFilePath}, ${filePath}`)
    fs.unlinkSync(oldFilePath);
  } 


  const modifiedContent = await modifyMarkDownContent(filePath, body, blogContent) 
  if (!modifiedContent) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find product.'
    })
  }

  // get html content
  const blogModel = modelBlog()
  const blogMd = await blogModel.get(yyyy_mm, titleConvertName)
  if (!blogMd) {
    logger.error('Could not find blog.')
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not find blog.'
    })
  }


  const htmlContent = blogModel.saveToHtml(yyyy_mm, titleConvertName)
  if (!htmlContent) {
    logger.error('Convert to html failed.')
    throw createError({
      statusCode: 500,
      statusMessage: 'Convert to html failed.'
    })
  }

  return {
    blogName: titleConvertName,
    ...blogMd
  } 

})