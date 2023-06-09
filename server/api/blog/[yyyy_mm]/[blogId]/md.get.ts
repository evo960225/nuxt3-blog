import fs from 'fs'
import util from 'util';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';



async function getMarkDownContent(dirPath: string, fileName: string) {
  const directory = path.join(process.cwd(), dirPath)
  const fullPath = path.join(directory, fileName)
  const readFile = util.promisify(fs.readFile);
  const fileContents = await readFile(fullPath, 'utf8')
    .catch(e => {
      console.log(e);
    });
  
  if(!fileContents) { return null }

  const { data, content } = matter(fileContents);

  
  const BlogSchema = z.object({
    title: z.string(),
    date: z.string(),
    category: z.string(),
    content: z.string(),
    ogImage: z.string().optional(),
    description: z.string().optional(),
  });
  
  type BlogSchema = z.infer<typeof BlogSchema>;
  const result = BlogSchema.parse({ 
    id: fileName.replace('.md', ''),
    ...data,
    content,
  })

  if(!result) { return null }

  return result
}

export default defineEventHandler(async(event) => {
  
  // if (!event.context.authBackstage) {
  //   return createError({
  //     statusCode: 401,
  //     message: 'You don\'t have the rights to access this resource',
  //   })
  // }

  const runtimeConfig = useRuntimeConfig()
  const logger = useLogger()
  const blogDir = runtimeConfig.blogsContentDir
  const yyyy_mm = event.context.params?.yyyy_mm
  const blogId = event.context.params?.blogId

  if (!blogDir && !yyyy_mm && !blogId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Prarameters are not valid.'
    })
  }
  const blogData = await getMarkDownContent(`${blogDir}/${yyyy_mm}/`, `${blogId}.md`)

  
  if (!blogData) {
    logger.error('Could not find content.')
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find content.'
    })
  }
  return blogData
})