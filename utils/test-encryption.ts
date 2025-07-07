import crypto from 'crypto';

const password = 'MyPassword@12345';
const secretKey = '4f3c2a1b9e8d7c6f5e4d3b2a190817161514131211100f0e0d0c0b0a09080706';
const key = crypto.scryptSync(secretKey, 'salt', 32);
const iv = crypto.randomBytes(16);

// Encrypt
const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
let encrypted = cipher.update(password, 'utf8', 'hex');
encrypted += cipher.final('hex');

console.log('Encrypted:', encrypted);
console.log('IV:', iv.toString('hex'));

// Decrypt
const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');

console.log('Decrypted:', decrypted);
