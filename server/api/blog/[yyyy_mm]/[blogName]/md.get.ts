import fs from 'fs'
import util from 'util';
import path from 'path';
import matter from 'gray-matter';

async function getMarkDownContent(date_yyyy_mm: string, fileName: string) {

  const fullPath = getBlogsContentFullDir(date_yyyy_mm, fileName)
  const readFile = util.promisify(fs.readFile);
  const fileContents = await readFile(fullPath, 'utf8')
    .catch(e => {
      console.log(e);
    });
  
  if(!fileContents) { return null }

  const { data, content } = matter(fileContents);

  const result = BlogSchema.parse({ 
    ...data,
    content,
  })

  if(!result) { return null }

  return result
}

export default defineEventHandler(async(event) => {
  
  if (!event.context.authBackstage) {
    return createError({
      statusCode: 401,
      message: 'You don\'t have the rights to access this resource',
    })
  }

  const runtimeConfig = useRuntimeConfig()
  const logger = useLogger()
  const blogDir = runtimeConfig.blogsContentDir
  const yyyy_mm = event.context.params?.yyyy_mm
  const blogName = event.context.params?.blogName

  if (!blogDir && !yyyy_mm && !blogName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Prarameters are not valid.'
    })
  }

  const encodedName = decodeURIComponent(blogName as string);
  const blogModel = modelBlog()
  const blogData = await blogModel.get(`${yyyy_mm}`, `${encodedName}.md`)

  
  if (!blogData) {
    logger.error('Could not find content.')
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find content.'
    })
  }
  return blogData
})