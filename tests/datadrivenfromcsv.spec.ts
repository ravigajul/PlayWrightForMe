import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { decryptPassword } from '../utils/crypto-utils';

const csvPath = path.resolve(__dirname, '../testdata/login-data.csv');
const fileContent = fs.readFileSync(csvPath, 'utf-8');
const testCases = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
});

test.describe('Login Tests from CSV', () => {
    for (const { name, userName, encrypted, iv, expectSuccess } of testCases) {
        test(name, async ({ page }) => {
            await page.goto('https://dev.azure.com/testing/',{});

            let password = '';
            try {
                password = decryptPassword(encrypted, iv);
            } catch (error) {
                console.warn(`Decryption failed for ${name}:`, error.message);
            }

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

            if (expectSuccess === 'true') {
                await expect(page.getByRole('tablist')).toContainText('ProjectsMy work itemsMy pull requests');
            } else {
                await expect(
                    page.locator('text=This username may be incorrect. Make sure you typed it correctly. Otherwise, contact your admin.')
                ).toBeVisible();
            }
        });
    }
});
