// import { initializeApp } from "firebase/app";
import admin from 'firebase-admin';
import { initializeApp, cert }  from 'firebase-admin/app';
import { getStorage } from "firebase-admin/storage";
import serviceAccount from '@/_private/firebase_admin.json';
import imagemin from 'imagemin';
import imageminMozjpeg from 'imagemin-mozjpeg';
import jimp from 'jimp';
import winston from 'winston';


export default defineEventHandler(async (event) => {
  
  const logger = useLogger()
  
  logger.info('Hello world');
  logger.warn('Warning message');
  logger.error('Error info');
  return { result: 0 };


})