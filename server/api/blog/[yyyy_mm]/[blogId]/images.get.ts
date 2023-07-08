import fs from 'fs'
import util from 'util';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const runtimeConfig = useRuntimeConfig()

function getImagesUrlFromDir(dirPath: string, baseUrl?: string) {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
  return fs.readdirSync(dirPath).filter(file => {
    return imageExtensions.includes(path.extname(file).toLowerCase().slice(1));
  }).map(x => {
    return `${baseUrl}/${x}`
  });
}

export default defineEventHandler(async (event) => {
  
  const blogDir = process.env.BLOG_DIR
  const yyyy_mm = event.context.params?.yyyy_mm || ''
  const blogId = event.context.params?.blogId || ''
  

  if (!blogDir && !yyyy_mm && !blogId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Prarameters are not valid.'
    })
  }


  const firebaseAdmin = useFirebaseAdmin()
  const bucket = firebaseAdmin.storage().bucket();
  const [urlResponse] = await bucket.getFiles({
    prefix: getFirebaseBlogDest(yyyy_mm, blogId)
  })
  const imagesUrl = urlResponse.map(x => x.metadata.mediaLink)
  
  if (!imagesUrl) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find images.'
    })
  }

  return imagesUrl

  // const storageDir = process.env.STORAGE_DIR || ''
  // const fullStorageDir = path.join(process.cwd() , storageDir)
  // const imagesfolder = path.join(fullStorageDir, 'images')
  // const imagesYMFolder = path.join(imagesfolder , yyyy_mm)
  // const imagesIdFolder = path.join(imagesYMFolder , blogId)
  
  
  // if (!fs.existsSync(imagesIdFolder)) {
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: 'Could not find images.'
  //   })
  // }


  // const baseUrl = `${runtimeConfig.public.imageUrlBase}/${yyyy_mm}/${blogId}`
  // const imagesUrl = getImagesUrlFromDir(imagesIdFolder, baseUrl);

  // if (!imagesUrl) {
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: 'Could not find images.'
  //   })
  // }

  // return imagesUrl
})