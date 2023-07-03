
import admin from 'firebase-admin';
import { getApps, cert }  from 'firebase-admin/app';
import serviceAccount from '@/_private/firebase_admin.json';

export function useFirebaseAdmin() {
  const apps = getApps()
  
  if (apps.length === 0 && !apps.length) {
    const app = admin.initializeApp({
      credential: cert(serviceAccount as admin.ServiceAccount),
      storageBucket: 'hoshiko-342fb.appspot.com'
    });
  }

  return admin

}