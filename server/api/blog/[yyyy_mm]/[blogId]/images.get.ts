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
  
  const runtimeConfig = useRuntimeConfig()
  const blogDir = runtimeConfig.blogsContentDir
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


})