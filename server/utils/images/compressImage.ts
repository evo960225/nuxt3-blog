import imagemin from 'imagemin';
import jimp from 'jimp';
import path from 'path';
import fs from 'fs';

export async function compressJpgImage(filePath: string, destPath: string , quality: number = 80) { 

  const folderPath = filePath.replace(filePath.split('/').pop() as string, '');

  const files = await imagemin([filePath], {
    destination: path.join(folderPath, 'saved'),
    plugins: [
      imageminMozjpeg({
        quality: quality, // 調整 JPEG 的壓縮品質 (0-100)
      }),
    ]
  });

  files.forEach(file => {
    let oldPath = file.destinationPath;
    let newPath = path.join(path.dirname(oldPath), path.basename(oldPath) + '_compressed.jpg');
    fs.renameSync(oldPath, newPath);
  });

  return files

}

export async function compressImageToJpg(filePath: string, quality: number = 80, width: number = -1, height: number = -1) { 
  
  const convertedFilePath = path.format({
    dir: path.dirname(filePath),
    name: path.basename(filePath, path.extname(filePath)),
    ext: '.jpg'
  });

  await jimp
    .read(filePath)
    .then((image) => {
      let editedImage = image
      if (width !== -1 || height !== -1) {
        editedImage = image.resize(
          (width !== -1 ? width : jimp.AUTO), 
          (height !== -1 ? height : jimp.AUTO)
        )
      }
      editedImage
        .quality(quality)
        .write(convertedFilePath); // save
    })
    .catch((err) => {
      throw err
    });


  return convertedFilePath
}


