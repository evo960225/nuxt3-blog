import fs from 'fs'
import util from 'util';
import path from 'path';
import matter from 'gray-matter';
import {unified} from 'unified'
import rehypeParse from 'rehype-parse'
import rehypeSanitize, {defaultSchema} from 'rehype-sanitize'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'

export default defineEventHandler(async(event) => {

  const logger = useLogger()
  const runtimeConfig = useRuntimeConfig()
  
  // params
  const blogDir = runtimeConfig.blogsContentDir
  const yyyy_mm = event.context.params?.yyyy_mm
  const blogName = event.context.params?.blogName

  if (!blogDir && !yyyy_mm && !blogName) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Prarameters are not valid.'
    })
  }

  const encodedId = decodeURIComponent(blogName as string);

  // get html content
  const blogModel = modelBlog()
  const blogHtml = await blogModel.getHtmlContentJsonFile(`${yyyy_mm}`, `${encodedId}.json`)
  
  // check if content exists
  if (!blogHtml) {
    logger.error('Could not find content.')
    throw createError({
      statusCode: 500,
      statusMessage: 'Could not find content.'
    })
  }

  // check XSS attack
  defaultSchema.tagNames?.push('iframe')
  blogHtml.contentHtml = (await unified()
    .use(rehypeParse)
    .use(rehypeRaw)
    .use(rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        iframe: ['src', 'width', 'height'],
      },
    })
    .use(rehypeStringify,)
    .process(blogHtml.contentHtml)).value.toString()

  return blogHtml
})