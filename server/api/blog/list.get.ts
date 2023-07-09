import fs from 'fs'
import util from 'util';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';


function getMarkdownFiles(dir: string, filelist: string[] = []): string[] {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      filelist = getMarkdownFiles(filePath, filelist);
    } else if (path.extname(file) === '.md') {
      filelist.push(filePath);
    }
  });

  return filelist;
}

export default defineEventHandler(async(event) => {
  const runtimeConfig = useRuntimeConfig()
  const blogDir = runtimeConfig.blogsContentDir
  
  if (blogDir === undefined) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Prarameters are not valid.'
    })
  }

  const files = getMarkdownFiles(blogDir)

  const BlogSchema = z.object({
    id: z.string(),
    title: z.string(),
    date: zodDateStringSchema(),
    category: z.string(),
    content: z.string(),
  })
  type BlogSchema = z.infer<typeof BlogSchema>

  const blogInfoList = files.map((file) => {
    const fileContents = fs.readFileSync(file, 'utf8');
    const { data, content } = matter(fileContents);


    const result = BlogSchema.parse({
      id: file.split("\\").slice(-1)[0].replace('.md', ''),
      ...data,
      content,
    })
    return result
  })



  if (!blogInfoList) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find product.'
    })
  }

  const result: IApiPageResult<IBlogInfo> = {
    data: blogInfoList,
    page: 1,
    pageSize: 5,
    totalPage: Math.ceil(files.length / 10),
    total: files.length,
  }
  return result
})