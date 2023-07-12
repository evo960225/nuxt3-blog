import fs from 'fs'
import path from 'path';
import matter from 'gray-matter';
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkImages from 'remark-images'
import rehypeSanitize from 'rehype-sanitize'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
const contentDirectory = path.join(process.cwd(), 'content');


async function modifyMarkDownContent(filePath:string, field: IBlogInfo, content: string) {
  const newContent = matter.stringify(content, field);
  fs.writeFileSync(filePath, newContent);
  return newContent;
}

export default defineEventHandler(async (event) => {
  
  // if (!event.context.authBackstage) {
  //   return createError({
  //     statusCode: 401,
  //     message: 'You don\'t have the rights to access this resource',
  //   })
  // }

  if (!event.context.params) {
    return createError({
      statusCode: 400,
      message: 'Invalid request',
    })
  }
  const logger = useLogger()
  const runtimeConfig = useRuntimeConfig()
  const blogDir = runtimeConfig.blogsContentDir
  const body:IBlog = await readBody(event)

  const { yyyy_mm, blogId } = event.context.params
  const blogContent = body.content || ''
  delete body.content

  const filePath = `${process.cwd()}/${blogDir}/${yyyy_mm}/${blogId}.md`

  const urlName = body.title
    .replace(/\s+/g, '-') // 將所有的空格替換成破折號
    .replace(/[^\w\s一-龥]/g, '-') // 移除所有非字母、非數字、非中文和非破折號的字符
    .replace(/-+/g, '-') // 將多個連續的破折號替換成一個
    .replace(/^-|-$/g, ''); // 移除開頭和結尾的破折號

  // mdfile rename if title changed
  if (blogId !== urlName) {

    // check if folder exists
    const newFilePath = `${process.cwd()}/${blogDir}/${yyyy_mm}/${urlName}.md`
    if (fs.existsSync(newFilePath)) {
      throw createError({
        statusCode: 400,
        statusMessage: 'File already exists.'
      })
    }
    try {
      fs.renameSync(filePath, newFilePath)
    } catch (err) {
      logger.error(err);
      throw createError({
        statusCode: 400,
        statusMessage: 'Could not rename file.'
      }) 
    }
  }


  const modifiedContent = modifyMarkDownContent(filePath, body, blogContent) 

  if (!modifiedContent) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find product.'
    })
  }
  
  
  
  return modifiedContent
})