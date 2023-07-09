
import jimp from 'jimp';
import path from 'path';
import fs from 'fs';


export async function compressImageToJpg(filePath: string, newfilePath: string = '', quality: number = 80, width: number = -1, height: number = -1) { 

  const _newFilePath = newfilePath || filePath

  // Check if file exists
  if (!fs.existsSync(filePath)) {
    throw new Error('File does not exist')
  }

  // Check if file is an image
  if (!['.jpg', '.jpeg', '.png'].includes(path.extname(filePath))) {
    throw new Error('File is not an image')
  }

  const convertedFilePath = path.format({
    dir: path.dirname(_newFilePath),
    name: path.basename(_newFilePath, path.extname(_newFilePath)),
    ext: '.jpg'
  });

  // jimp await
  const imageFile = await jimp.read(filePath)
  try {
    let editedImage = imageFile
      if (width !== -1 || height !== -1) {
        editedImage = imageFile.resize(
          (width !== -1 ? width : jimp.AUTO), 
          (height !== -1 ? height : jimp.AUTO)
        )
      }
      await editedImage
        .quality(quality)
        .writeAsync(convertedFilePath); // save
  } catch (error) {
    throw new Error('Error while compressing image')
  }


  return convertedFilePath
}


