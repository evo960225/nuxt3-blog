// import { initializeApp } from "firebase/app";
import admin from 'firebase-admin';
import { initializeApp, cert }  from 'firebase-admin/app';
import { getStorage } from "firebase-admin/storage";
import serviceAccount from '@/_private/firebase_admin.json';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import jimp from 'jimp';


export default defineEventHandler(async (event) => {
  
  const runtimeConfig = useRuntimeConfig()
  const firebaseDest = runtimeConfig.firebaseImagesDest + 'test-00.jpg'

  const filePath = await compressPngToJpg('./storage/images/2023-05/1/1-92811bc0.png')

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
  const url = await file
    .makePublic()
    .then(() => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
      return publicUrl
    })
    .catch((error) => {
      console.error("Error making file public:", error);
    });

  return url


})