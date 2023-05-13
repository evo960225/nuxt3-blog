import fs from 'fs'
import path from 'path';
import formidable from 'formidable';

export default defineEventHandler(async (event) => {
  
  // if (!event.context.authBackstage) {
  //   return createError({
  //     statusCode: 401,
  //     message: 'You don\'t have the rights to access this resource',
  //   })
  // }


  const storageDir = process.env.STORAGE_DIR || ''
  const folder = path.join(process.cwd() , storageDir)

  
  const form = formidable({
    uploadDir: folder,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10 MB
    filename: (name, ext, part, form) => {
      return `${generateHash(name, 6)}${ext}`
    }
  })

  form.on('error', (err) => {
    console.error('An error has occurred with the upload: ', err);
  });


  const newFilename = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      const oldName = Object.keys(files)[0]
      resolve((files[oldName] as formidable.File).newFilename)
    })
  })
  
  return { newFilename: newFilename }
})