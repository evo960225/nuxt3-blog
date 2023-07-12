import fs from 'fs'
import moment from 'moment'

export default defineEventHandler(async(event) => {

  if (!event.context.authBackstage) {
    return createError({
      statusCode: 401,
      message: 'You don\'t have the rights to access this resource',
    })
  }

  const logger = useLogger()

  // get title by hash
  const fileName = generateHash(new Date().toISOString())
  const blogDir = makeBlogContentPath(fileName)

  // check if folder exists
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }

  const now = moment()
  
  const content = `
    ---
    title: 遊戲文章
    date: '${now.format('YYYY-MM-DD')}'
    category: none
    --- `.replaceAll( /\n\s*/, ' ')

  const tempName = generateHash(new Date().toISOString())
  try {
    fs.writeFileSync(`${blogDir}/${tempName}.md`, content);
  } catch (err) {
    logger.error(err);
    return;
  }
  
  logger.info('Markdown file created successfully.');
  return {
    yyyy_mm: now.format('YYYY-MM'),
    blogId: tempName
  }
})