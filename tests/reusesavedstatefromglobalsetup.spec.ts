import { test,expect } from "playwright/test";

test.use({ storageState: 'auth.json' });
test('Reuse saved state from global setup', async ({ page }) => {
    // This test will use the saved state from the global setup
    await page.goto('/logged-in-successfully/');
    await expect(page.getByRole('heading')).toContainText('Logged In Successfully');
});

test('Navigate to Practise',async ({page})=>{
    await page.goto('/'); 
    await page.click('a[href*="practice"]');
    await expect(page.getByText('Hello')).toBeVisible(); 
});
