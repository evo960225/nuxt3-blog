import crypto from 'crypto';

// 創建哈希
export function createHash(password: string) {
  const salt = crypto.randomBytes(16).toString('hex'); // 創建一個隨機的盐
  const hash = crypto.pbkdf2Sync(password, salt, 100, 64, `sha512`).toString(`hex`); // 創建一個哈希
  return [salt, hash].join(':');
}

// 驗證哈希
export function verifyHash(password: string, original: string) {
  const [salt, originalHash] = original.split(':');
  const hash = crypto.pbkdf2Sync(password, salt, 100, 64, `sha512`).toString(`hex`);
  return hash === originalHash;
}
