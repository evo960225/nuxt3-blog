import fs from 'fs'
import util from 'util';
import path from 'path';
import matter from 'gray-matter';
import { z } from 'zod';

const runtimeConfig = useRuntimeConfig()

function deleteImage(dirPath:string, fileName: string) {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];

  // 確認檔案存在
  const filePath = path.join(dirPath, fileName);
  if (!fs.existsSync(filePath)) {
    console.error(`File ${filePath} does not exist`);
    return;
  }

  // 確認檔案為圖片
  const fileExtension = path.extname(fileName).slice(1); // 移除點（.）並取得副檔名
  if (!imageExtensions.includes(fileExtension)) {
    console.error(`File ${filePath} is not an image file`);
    return;
  }

  // 嘗試刪除檔案
  try {
    fs.unlinkSync(filePath);
    console.log(`File ${filePath} has been deleted`);
  } catch (err) {
    console.error(`Failed to delete file ${filePath}:`, err);
  }

  return true
}


export default defineEventHandler(async (event) => {
  
  const { fileName } = await readBody(event)
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

  const storageDir = runtimeConfig.storageDir || ''
  const fullStorageDir = path.join(process.cwd() , storageDir)
  const imagesfolder = path.join(fullStorageDir, 'images')
  const imagesYMFolder = path.join(imagesfolder , yyyy_mm)
  const imagesIdFolder = path.join(imagesYMFolder , blogId)
  
  
  if (!fs.existsSync(imagesIdFolder)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find images.'
    })
  }


  const baseUrl = `${runtimeConfig.public.imageUrlBase}/${yyyy_mm}/${blogId}`
  const result = deleteImage(imagesIdFolder, fileName);

  if (!result) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Could not find images.'
    })
  }

  return result
})