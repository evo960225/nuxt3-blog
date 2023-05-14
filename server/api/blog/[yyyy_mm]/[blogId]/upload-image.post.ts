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

  const yyyy_mm = event.context.params?.yyyy_mm || ''
  const blogId = event.context.params?.blogId|| ''

  const storageDir = process.env.STORAGE_DIR || ''
  const fullStorageDir = path.join(process.cwd(), storageDir)
  const imagesfolder = path.join(fullStorageDir, 'images')
  const imagesYMFolder = path.join(imagesfolder, yyyy_mm)
  const imagesIdFolder = path.join(imagesYMFolder, blogId)

  if (!fs.existsSync(imagesfolder)) {
   fs.mkdirSync(imagesfolder);
  }
  if (!fs.existsSync(imagesYMFolder)) {
    fs.mkdirSync(imagesYMFolder);
  }
  if (!fs.existsSync(imagesIdFolder)) {
    fs.mkdirSync(imagesIdFolder);
  }

  const form = formidable({
    uploadDir: imagesIdFolder,
    keepExtensions: true,
    maxFileSize: 10 * 1024 * 1024, // 10 MB
    filename: (name, ext, part, form) => {
      return `${blogId}-${generateHash(name, 8)}${ext}`
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