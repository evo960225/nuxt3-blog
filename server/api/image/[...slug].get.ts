import fs from 'fs'
import mime from 'mime-types'
import path from 'path'

export default defineEventHandler(async (event) => {

    const fileDir = event.context.params?.slug
    const storageDir = process.env.STORAGE_DIR || ''
    const folder = path.join(process.cwd() , storageDir)
    const filePath = `${folder}/images/${fileDir}`

    if (!mime.lookup(filePath)) {
      return createError({
        statusCode: 404,
        message: 'File not found',
      })
    }

    event.node.res.setHeader('Content-Type', mime.lookup(filePath) || 'text/plain')
    

    try {
      const files = fs.readFileSync(filePath);
      return files
    } catch (e) {
      return createError({
        statusCode: 404,
        message: 'File not found',
      })
    }

})