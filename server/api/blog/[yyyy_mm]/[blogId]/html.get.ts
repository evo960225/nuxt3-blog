import fs from 'fs'
import util from 'util';
import path from 'path';
import matter from 'gray-matter';
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkImages from 'remark-images'
import remarkBreaks from 'remark-breaks'
import rehypeSanitize from 'rehype-sanitize'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm';
import remarkInlineLinks from 'remark-inline-links'
import { z } from 'zod';



async function getHtmlContent(dirPath: string, fileName: string) {
  const directory = path.join(process.cwd(), dirPath)
  const fullPath = path.join(directory, fileName)
  const readFile = util.promisify(fs.readFile);
  const fileContents = await readFile(fullPath, 'utf8')
    .catch(e => {
      console.log(e);
    });
  
  if(!fileContents) { return null }

  const { data, content } = matter(fileContents);
  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkInlineLinks)
    .use(remarkGfm)
    .use(remarkImages)
    .use(remarkBreaks)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(content)


  const contentHtml = processedContent.toString();

  const BlogHtmlSchema = z.object({
    id: z.string(),
    title: z.string(),
    date: zodDateStringSchema(),
    category: z.string(),
    contentHtml: z.string(),
  });
  
  type BlogSchema = z.infer<typeof BlogHtmlSchema>;
  const result = BlogHtmlSchema.parse({ 
    id: fileName.replace('.md', ''),
    ...data,
    contentHtml,
  })

  if(!result) { return null }

  return result
}

export default defineEventHandler(async(event) => {
  

  const blogDir = process.env.BLOG_DIR
  const yyyy_mm = event.context.params?.yyyy_mm
  const blogId = event.context.params?.blogId

  if (!blogDir && !yyyy_mm && !blogId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Prarameters are not valid.'
    })
  }
  const blogData = await getHtmlContent(`${blogDir}/${yyyy_mm}/`, `${blogId}.md`)

  
  if (!blogData) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find product.'
    })
  }
  return blogData
})