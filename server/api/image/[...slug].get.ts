import fs from 'fs'
import mime from 'mime-types'
import path from 'path'

export default defineEventHandler(async (event) => {

  const yyyy_mm = event.context.params?.yyyy_mm || ''
  const blogId = event.context.params?.blogId || ''

  const runtimeConfig = useRuntimeConfig()
  const fileDir = event.context.params?.slug
  const storageDir = runtimeConfig.storageDir || ''
  const folder = path.join(process.cwd() , storageDir)
  const filePath = `${folder}/images/${fileDir}`

  if (!mime.lookup(filePath)) {
    throw createError({
      statusCode: 404,
      message: 'File not found',
    })
  }

  
  try {
    const files = fs.readFileSync(filePath);
    return files
  } catch (e) {
    throw createError({
      statusCode: 404,
      message: 'File not found',
    })
  }

})