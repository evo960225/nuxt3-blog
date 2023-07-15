import fs from 'fs'
import path from 'path';
import util from 'util';
import formidable from 'formidable';
import moment from 'moment';

export default defineEventHandler(async (event) => {
  
  if (!event.context.authBackstage) {
    return createError({
      statusCode: 401,
      message: 'You don\'t have the rights to access this resource',
    })
  }
  const runtimeConfig = useRuntimeConfig()
  const logger = useLogger()
  const yyyy_mm = event.context.params?.yyyy_mm || ''
  const blogName = decodeURIComponent(event.context.params?.blogName || '')

  const blogModel = modelBlog()
  const blogMd = await blogModel.get(yyyy_mm, `${blogName}`)
  if (!blogMd) {
    logger.error('Could not find blog.')
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find blog.'
    })
  }
  const blogId = blogMd?.id

  // create folder if not exist
  const storageDir = runtimeConfig.storageDir || ''
  const fullStorageDir = path.join(process.cwd(), storageDir)
  const imagesfolder = path.join(fullStorageDir, 'images')
  const imagesYMFolder = path.join(imagesfolder, yyyy_mm)
  const imagesIdFolder = path.join(imagesYMFolder, blogName)
  
  if (!fs.existsSync(imagesfolder)) {
   fs.mkdirSync(imagesfolder);
  }
  if (!fs.existsSync(imagesYMFolder)) {
    fs.mkdirSync(imagesYMFolder);
  }
  if (!fs.existsSync(imagesIdFolder)) {
    fs.mkdirSync(imagesIdFolder);
  }

  // upload image
  const form = formidable({
    uploadDir: imagesIdFolder,
    keepExtensions: true,
    maxFileSize: 20 * 1024 * 1024, // 20 MB
    filename: (name, ext, part, form) => {
      return `${moment().format('YYYYMMDD')}${generateHash(name, 8)}${ext}`
    }
  })

  form.on('error', (err) => {
    logger.error('An error has occurred with the upload: ', err);
    createError({
      statusCode: 500,
      statusMessage: 'An error has occurred with the upload.'
    })
  });

  const hashFilename: string = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if(err) {
        if (err.code ===  formidable.errors.biggerThanMaxFileSize) {
          logger.error('maxFileSize exceeded')
          return reject(createError({
            statusCode: 413,
            statusMessage: 'maxFileSize exceeded'
          }))
        }
        reject(err);
      }
      const oldName = Object.keys(files)[0]
      resolve((files[oldName] as formidable.File).newFilename)
    })
  })

  // compress image and convert it to jpg, if image is jpg ro png
  let filePath = path.join(imagesIdFolder, hashFilename)
  if (hashFilename.endsWith('.jpg') 
    || hashFilename.endsWith('.png')
    || hashFilename.endsWith('.jpeg')
  ) {
    filePath = await compressImageToJpg(filePath)
  }

  

  // upload to firebase storage
  const firebaseDest = `${getFirebaseBlogDest(yyyy_mm, blogId)}/${hashFilename}`;
  const firebaseAdmin = useFirebaseAdmin()
  const bucket = firebaseAdmin.storage().bucket();
  await bucket.upload(filePath, {
    destination: firebaseDest,
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  }).catch((err) => {
    logger.error('err', err)
  });

  const file = bucket.file(firebaseDest);
  const fileUrl = await file
    .makePublic()
    .then(() => {
      return getFilePublicUrl(file.name);
    })
    .catch((error) => {
      console.error("Error making file public:", error);
    });

  
  // delete local file
  fs.unlinkSync(filePath)

  return { newFilename: hashFilename, fileUrl }
})