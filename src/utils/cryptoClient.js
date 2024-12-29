//This manages all the logic for encryption


const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const {CRYPTO_KEY} = require('../config/secrets')

// Custom key (ensure it's 32 bytes for AES-256)
const key = Buffer.from(CRYPTO_KEY); // 32 bytes key (256 bits)
const iv = crypto.randomBytes(16);  // 128-bit IV

// Encrypt function
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { encryptedText: encrypted, iv: iv.toString('hex') }; // return encrypted text and IV
}

// Decrypt function
function decrypt(encryptedText, ivHex) {
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(ivHex, 'hex'));
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}


module.exports = {encrypt,decrypt}