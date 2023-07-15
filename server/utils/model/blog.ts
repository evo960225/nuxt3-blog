import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import moment from 'moment'
import path from 'path'
import util from 'util'
import matter from 'gray-matter';

const runtimeConfig = useRuntimeConfig()
const prisma = new PrismaClient()
const logger = useLogger()


class BlogModel {

  async create() {
    
    // get title by hash
    const fileName = generateHash(new Date().toISOString())
    const blogDir = makeBlogContentPath(fileName)
    
    // check if folder exists
    if (!fs.existsSync(blogDir)) {
      fs.mkdirSync(blogDir, { recursive: true });
    }

    // create content
    const now = moment()
    const yyyy_mm = now.format('YYYY-MM')
    const yyyy_mm_dd = now.format('YYYY-MM-DD')
    const hashName = generateHash(new Date().toISOString(), 12)
    const content = `---
id: '${hashName}'
title: '${hashName}'
date: '${yyyy_mm_dd}'
category: none
--- `

    try {
      fs.writeFileSync(`${blogDir}/${hashName}.md`, content);
    } catch (err) {
      logger.error(err);
      return null;
    }

    logger.info('Markdown file created successfully.');
    const blogData = await this.get(`${yyyy_mm}`, `${hashName}.md`)

    return blogData
  }


  async get(date_yyyy_mm: string, fileName: string) {
    // check if ext exists
    const fileNameWithExt = path.extname(fileName) === '.md' ? fileName : `${fileName}.md`
    
    const fullPath = getBlogsContentFullDir(date_yyyy_mm, fileNameWithExt)
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
}


export function modelBlog() {
  return new BlogModel()
} 

