import { test,expect } from "playwright/test";

test('async-await example', async ({ page }) => {
  // Navigate to the page
  await page.goto('https://practicetestautomation.com/practice-test-login/');

  // Wait for an element to be visible
  await page.waitForSelector('#username',{ state: 'visible'});

  // Perform an action
  await page.click('#submit');

  //no await here as the return value of the locator is not a promis

  expect(page.url()).toContain('practice-test-login'); // Check if the URL contains 'practice-test-login'

  //await here as the return value of the locator is a promise
  await expect(page.locator('#error')).toBeVisible(); // Check if the error message is visible
});