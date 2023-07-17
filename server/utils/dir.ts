import path from 'path'
import moment from 'moment'
const logger = useLogger()

// LogsFullDir in logger.ts, because logger uses `LogsFullDir` that isn't initialized yet.

export function getBlogsContentFullDir(date_yyyy_mm: string, fileName?: string) { 
  
  const { blogsContentDir } = useRuntimeConfig()
  
  // check blogsContentDir isn't empty
  if (!blogsContentDir) {
    logger.error('Could not find blogs content dir.')
    throw createError({
      statusCode: 500,
      statusMessage: 'server setting error.'
    })
  }

  if (fileName) {
    // check fileName with ext
    const fileNameWithExt = path.extname(fileName) === '.md' ? fileName : `${fileName}.md`
    return path.join(process.cwd(), blogsContentDir, date_yyyy_mm, fileNameWithExt)
  }
  return path.join(process.cwd(), blogsContentDir, date_yyyy_mm)

}

export function getBlogsJsonFullDir(date_yyyy_mm: string, htmlFileName?: string) { 
  
  const { blogsContentDir } = useRuntimeConfig()
  
  // check blogsContentDir isn't empty
  if (!blogsContentDir) {
    logger.error('Could not find blogs content dir.')
    throw createError({
      statusCode: 500,
      statusMessage: 'server setting error.'
    })
  }

  if (htmlFileName) {
    // check fileName with ext
    const fileNameWithExt = path.extname(htmlFileName) === '.json' ? htmlFileName : `${htmlFileName}.json`
    return path.join(process.cwd(), blogsContentDir, date_yyyy_mm, fileNameWithExt)
  }
  return path.join(process.cwd(), blogsContentDir, date_yyyy_mm)

}

export function getStorageFullDir(fileName?: string) { 
  
  const { storageDir } = useRuntimeConfig()

  // check storageDir isn't empty
  if (!storageDir) {
    logger.error('Could not find storageDir dir.')
    throw createError({
      statusCode: 500,
      statusMessage: 'server setting error.'
    })
  }

  return (!fileName)
    ? path.join(process.cwd(), storageDir)
    : path.join(process.cwd(), storageDir, fileName)
}


export function makeBlogContentPath(fileName: string) {
  const { blogsContentDir } = useRuntimeConfig()

  // check logsDir isn't empty
  if (!blogsContentDir) {
    logger.error('Could not find logsDir dir.')
    throw createError({
      statusCode: 500,
      statusMessage: 'server setting error.'
    })
  }

  const currentDate = moment();
  const formattedDate = currentDate.format('YYYY-MM');
  const folderName = formattedDate;


  return path.join(process.cwd(), blogsContentDir, formattedDate)
  
}
