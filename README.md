# Nuxt 3 Blog

## 我該如何安裝？

### 先下載並安裝Node.js，使用npm進行安裝
```bash
npm install
```

### 設定env
將`env`重新命名為 `.env`，並設定內容
```bash
HOST="https://blog.hoshiko.live/"   # 伺服器網址

BLOGS_CONTENT_DIR="./content"       # blog檔案存放位置(.md/html)
STORAGE_DIR="./storage"             # 後端檔案儲存位置
LOGS_DIR="./logs"                   # 後端log存放位置
DATABASE_URL="postgresql://"        # 資料庫URL
SHADOW_DATABASE_URL="postgresql://" # SHADOW_DATABASE URL

JWT_SIGN_SECRET_BACKSTAGE=""        # JWT 秘鑰
RECAPTCHA_SITE_KEY=""               # RECAPTCHA的網站鑰匙
RECAPTCHA_SECRET_KEY=""             # RECAPTCHA的密鑰
FIREBASE_IMAGES_DEST="blog/images"  # 指定blog存入firebase storage的目錄

PERCY_TOKEN=                        # percy token，如果沒有要E2E測試不用填入
```

### Firebase設定
- 在firebase裡建立專案後，在專案總覽點選新增應用程式(在專案名稱下方，我常找不到🙃
- 選擇網站應用程式，按照流程完成後會取得像這樣的程式碼
```
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "hoshiko-xxxx.firebaseapp.com",
  projectId: "hoshiko-xxxx",
  storageBucket: "hoshiko-xxxx.appspot.com",
  messagingSenderId: "000000000",
  appId: "1:677163167994:web:0000000000000000000",
  measurementId: "G-PTV000000"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
```
建立 `_private` 資料夾後將上述資料存成 `firebase_admin.json`並放置到 `_private`


### Generate Database
如果沒有自己的資料庫，建議設定sqlite，[link](https://www.prisma.io/docs/concepts/database-connectors/sqlite)
```bash
npx prisma generate
```

### Start the Development Server 
```bash
npm run dev
```
Start the development server on http://localhost:3000
