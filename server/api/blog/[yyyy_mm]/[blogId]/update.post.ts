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
  const blogDir = process.env.BLOG_DIR
  const body:IBlog = await readBody(event)

  const yyyy_mm = event.context.params?.yyyy_mm
  const blogId = event.context.params?.blogId
  const blogContent = body.content || ''
  delete body.content

  const filePath = `${process.cwd()}/${blogDir}/${yyyy_mm}/${blogId}.md`
  const modifiedContent = modifyMarkDownContent(filePath, body, blogContent) 

  if (!modifiedContent) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find product.'
    })
  }
  return modifiedContent
})