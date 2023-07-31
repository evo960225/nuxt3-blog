# Nuxt 3 Bolog

## 我該如何安裝？

### 先下載並安裝Node.js，使用npm進行安裝
```bash
npm install
```

### 設定env
將`env`重新命名為 `.env`，並設定內容
```bash
HOST="https://blog.hoshiko.live/" # 伺服器網址

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
create `_private` folder and generate `firebase_admin.json` to  `_private`

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
