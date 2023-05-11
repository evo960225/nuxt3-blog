import fs from 'fs'
import path from 'path';
import matter from 'gray-matter';
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import rehypeSanitize from 'rehype-sanitize'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
const contentDirectory = path.join(process.cwd(), 'content');


async function getMarkDownContent(dirPath: string, fileName: string) {
  const directory = path.join(contentDirectory, dirPath)
  const fullPath = path.join(directory, fileName)
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  return {
    ...data,
    content,
  };
}

export default defineEventHandler(async(event) => {
  
  if (!event.context.authBackstage) {
    return createError({
      statusCode: 401,
      message: 'You don\'t have the rights to access this resource',
    })
  }
  const yyyy_mm = event.context.params?.yyyy_mm
  const blogId = event.context.params?.blogId
  


  if (!record) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find product.'
    })
  }
  return {}
})