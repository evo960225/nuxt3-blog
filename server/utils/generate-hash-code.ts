import crypto from 'crypto';

function generateRandomString(length: number) {
  return crypto.randomBytes(length).toString('hex');
}

export function generateHash(inputString = generateRandomString(6), hashLength = 6): string{
  const hash = crypto.createHash('sha256');
  hash.update(inputString);
  const fullHash = hash.digest('hex');
  return fullHash.slice(0, hashLength);
}