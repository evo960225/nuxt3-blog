import fs from 'fs'
import path from 'path';
import formidable from 'formidable';

export default defineEventHandler(async (event) => {
  
  if (!event.context.authBackstage) {
    return createError({
      statusCode: 401,
      message: 'You don\'t have the rights to access this resource',
    })
  }
  const runtimeConfig = useRuntimeConfig()
  const yyyy_mm = event.context.params?.yyyy_mm || ''
  const blogId = event.context.params?.blogId || ''

  // create folder if not exist
  const storageDir = runtimeConfig.storageDir || ''
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

  // upload image
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

  const hashFilename: string = await new Promise((resolve, reject) => {
    form.parse(event.node.req, (err, fields, files) => {
      if (err) {
        reject(err);
      }
      const oldName = Object.keys(files)[0]
      resolve((files[oldName] as formidable.File).newFilename)
    })
  })


  // compress image and convert to jpg, if image is jpg ro png
  let filePath = path.join(imagesIdFolder, hashFilename)
  if (hashFilename.endsWith('.jpg') 
    || hashFilename.endsWith('.png')
    || hashFilename.endsWith('.jpeg')
  ) {
    filePath = await compressImageToJpg(filePath)
  }
  const uploadFileName = path.basename(filePath)
  

  // upload to firebase storage
  const firebaseDest = `${getFirebaseBlogDest(yyyy_mm, blogId)}/${uploadFileName}`;
  const firebaseAdmin = useFirebaseAdmin()
  const bucket = firebaseAdmin.storage().bucket();
  await bucket.upload(filePath, {
    destination: firebaseDest,
    gzip: true,
    metadata: {
      cacheControl: 'public, max-age=31536000',
    },
  }).catch((err) => {
    console.log('err', err)
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