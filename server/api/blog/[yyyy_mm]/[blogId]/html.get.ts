import fs from 'fs'
import util from 'util';
import path from 'path';
import matter from 'gray-matter';
import {unified} from 'unified'
import remarkParse from 'remark-parse'
import remarkImages from 'remark-images'
import remarkBreaks from 'remark-breaks'
import rehypeSanitize, {defaultSchema} from 'rehype-sanitize'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm';
import remarkInlineLinks from 'remark-inline-links'
import rehypeRaw from 'rehype-raw'
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

  
  defaultSchema.tagNames?.push('iframe')

  const { data, content } = matter(fileContents);

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkInlineLinks) // hyperlinks
    .use(remarkGfm)         // GitHub Flavored Markdown
    .use(remarkImages)
    .use(remarkBreaks)      // soft line breaks
    .use(remarkRehype, {allowDangerousHtml: true})
    .use(rehypeRaw)
    .use(rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        iframe: ['src', 'width', 'height'],
      },
    })
    .use(rehypeStringify, {allowDangerousHtml: true})
    .process(content)


  const contentHtml = processedContent.toString();

  const BlogHtmlSchema = z.object({
    id: z.string(),
    title: z.string(),
    date: z.string(),
    category: z.string(),
    ogImage: z.string().optional(),
    description: z.string().optional(),
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
  // const logger = useLogger()
  const runtimeConfig = useRuntimeConfig()
  
  const blogDir = runtimeConfig.blogsContentDir
  const yyyy_mm = event.context.params?.yyyy_mm
  const blogId = event.context.params?.blogId

  
  if (!blogDir && !yyyy_mm && !blogId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Prarameters are not valid.'
    })
  }


  const encodedId = decodeURIComponent(blogId as string);
console.log(`${blogDir}/${yyyy_mm}/`, `${encodedId}.md`);

  const blogData = await getHtmlContent(`${blogDir}/${yyyy_mm}/`, `${encodedId}.md`)

  
  if (!blogData) {
    // logger.error('Could not find content.')
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not find content.'
    })
  }
  return blogData
})