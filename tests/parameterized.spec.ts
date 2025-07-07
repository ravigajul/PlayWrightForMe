import { test, expect } from '@playwright/test';
import { decryptPassword } from '../utils/crypto-utils';

const testCases = [
  {
    name: 'Valid credentials',
    userName: process.env.USER_NAME!,
    encrypted: process.env.ENCRYPTED!,
    iv: process.env.IV!,
    expectSuccess: true,
  },
  {
    name: 'Invalid credentials',
    userName: 'invalid@test.com',
    encrypted: 'invalidEncryptedPassword',
    iv: process.env.IV!,
    expectSuccess: false,
  },
];

test.describe('Login Tests', () => {
  for (const { name, userName, encrypted, iv, expectSuccess } of testCases) {
    test(name, async ({ page }) => {
      await page.goto('https://dev.azure.com/testing/');

      // Decrypt password safely
      let password = '';
      try {
        password = decryptPassword(encrypted, iv);
      } catch (error) {
        console.warn(`Decryption failed for ${name}:`, error.message);
      }

      // Fill email and proceed
      await page.getByRole('textbox', { name: 'someone@example.com' }).fill(userName);
      await page.getByRole('button', { name: 'Next' }).click();

      // Try to wait for password field
      const passwordField = page.getByRole('textbox', { name: 'Enter the password for' });
      try {
        await passwordField.waitFor({ timeout: 5000 });
        await passwordField.fill(password);
        await page.getByRole('button', { name: 'Sign in' }).click();
      } catch {
        console.warn(`Password field not visible for ${name}`);
      }

      // Assertions
      if (expectSuccess) {
        await expect(page.getByRole('tablist')).toContainText('ProjectsMy work itemsMy pull requests');
      } else {
        await expect(
          page.locator('text=This username may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin.')
        ).toBeVisible();
      }
    });
  }
});
