import { test, expect } from '@playwright/test';
test('Different Environments', async ({ page }) => {
   // await page.waitForTimeout(10000);
   // console.log('Loaded Base URL:'+ process.env.URL);
     await page.goto('/practice-test-login'); // Navigate to the base URL defined in playwright.config.ts
     await expect(page.locator('h2')).toContainText('Test login');
});
