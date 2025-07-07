
import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

export interface EncryptedResult {
  encrypted: string;
  iv: string;
}

/**
 * Encrypts a plain text password using AES-256-CBC.
 * @param password - The plain text password to encrypt.
 * @param secretKey - The secret key used for encryption.
 * @returns An object containing the encrypted password and IV in hex format.
 */
export function encryptPassword(password: string, secretKey: string): EncryptedResult {
  const key = crypto.scryptSync(secretKey, 'salt', 32);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');

  return {
    encrypted,
    iv: iv.toString('hex')
  };
}

/**
 * Decrypts an encrypted password using AES-256-CBC.
 * @param encrypted - The encrypted password in hex format.
 * @param ivHex - The IV used during encryption in hex format.
 * @param secretKey - The secret key used for decryption.
 * @returns The original plain text password.
 */

export function decryptPassword(encrypted: string, ivHex: string): string {
  try {
    const secretKey = process.env.SECRET_KEY!;
    const key = crypto.scryptSync(secretKey, 'salt', 32);
    const iv = Buffer.from(ivHex, 'hex');

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (error) {
    console.error('Decryption failed:', error.message);
    return ''; // Return empty string or a fallback value
  }
}
