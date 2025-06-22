import { expect } from '@playwright/test';
import { test } from './CustomFixture'; // Import the custom test that includes the loggedInPage fixture

test('basic test with built-in page fixture', async ({page}) => {
  //Page is a fixture that playwright provides. It automatically opens a browser and a new page.
  await page.goto('https://playwright.dev');
  await expect(page).toHaveTitle('Fast and reliable end to end testing for modern web apps | Playwright');
  await expect(page.getByRole('link', {name: 'Get started'})).toBeVisible();
});


test('custom fixture example', async ({loggedInPage}) => {  
  // This test uses the custom fixture defined in CustomFixture.ts
  await loggedInPage.goto('https://practicetestautomation.com/logged-in-successfully/');
  await expect(loggedInPage).toHaveTitle('Logged In Successfully | Practice Test Automation');
  await expect(loggedInPage.getByText('Logged In Successfully')).toBeVisible();
});

test('Navigate to courses page', async ({loggedInPage}) => {  
  // This test uses the custom fixture defined in CustomFixture.ts
  await loggedInPage.click('a[href*="courses"]');
  await expect(loggedInPage).toHaveURL(/.*courses/);
  await expect(loggedInPage.getByRole('heading', { name: 'Courses'})).toBeVisible();
});

test('context fixture example', async ({ browser ,context}) => {  
  // This test uses the browser fixture to create a new context
  //Open multiple pages
  //manager storage state, cookies, etc.
  const page1 = await context.newPage();
  await page1.goto('https://playwright.dev');
  await expect(page1).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright');
  await expect(page1.getByRole('link', {name: 'Get started'})).toBeVisible();
  const page2 = await context.newPage();
  await page2.goto('https://practicetestautomation.com/practice-test-login/');
  await expect(page2).toHaveTitle('Test Login | Practice Test Automation');
});