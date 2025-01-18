import CryptoJS from 'crypto-js';

const SECRET_KEY = process.env.NEXT_PUBLIC_CRYPTO_KEY; // Replace with a strong, secure key
// Encrypt data
export const encryptData = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

// Decrypt data
export const decryptData = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};
