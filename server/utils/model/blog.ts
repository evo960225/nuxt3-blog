import { PrismaClient } from '@prisma/client'
import fs from 'fs'
import moment from 'moment'
import path from 'path'
import util from 'util'
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
import pQueue from 'p-queue'

const runtimeConfig = useRuntimeConfig()
const prisma = new PrismaClient()
const logger = useLogger()
const queue = new pQueue({concurrency: 1});

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
    const hashName = generateHash(new Date().toISOString(), 16)
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
  
    // parse markdown
    const { data, content } = matter(fileContents);
    const result = BlogSchema.parse({ 
      ...data,
      content,
    })
  
    if(!result) { return null }
  
    return result
  }

  async saveToHtml(date_yyyy_mm: string, mdFileName: string) {

    const blog = await this.get(date_yyyy_mm, mdFileName)
    if (!blog) throw new Error('Content not found.')

    // convert markdown to html
    defaultSchema.tagNames?.push('iframe')
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
      .process(blog.content)

    // parse blogHtml
    const contentHtml = processedContent.toString();
    const blogHtml = BlogHtmlSchema.parse({
      ...blog,
      contentHtml,
    })

    // save html to file
    const jsonFileName = `${path.parse(mdFileName).name}.json`
    const jsonFullPath = getBlogsJsonFullDir(date_yyyy_mm, jsonFileName)
    logger.info({ method: 'convertToHtml', htmlFullPath: jsonFullPath })

    try {
      await queue.add(async () => {
        fs.writeFileSync(jsonFullPath, JSON.stringify(blogHtml));
      })
    } catch (err) {
      logger.error(err);
      return null;
    }
    return contentHtml

  }

  async getHtmlContentJsonFile(date_yyyy_mm: string, htmlFileName: string) {
    const htmlFullPath = getBlogsJsonFullDir(date_yyyy_mm, htmlFileName)
    const readFile = util.promisify(fs.readFile);
    const fileContents = await readFile(htmlFullPath, 'utf8')
      .catch(e => {
        console.log(e);
      });
    
    if(!fileContents) { return null }
    const blog = BlogHtmlSchema.parse(JSON.parse(fileContents))
    
    return blog;
  }


}


export function modelBlog() {
  return new BlogModel()
} 

