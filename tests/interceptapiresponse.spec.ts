import { test, expect } from '@playwright/test';

test('ntercept network request and get response body', async ({ page }) => {
  // Intercept the network request
  await page.route('**/todos/1', (route) => route.continue());

  // Navigate to the page that makes the network request
  await page.goto('https://jsonplaceholder.typicode.com');

  // Perform actions that trigger the network request
  await page.click('button#run-button'); 

  // Wait for the response and get the response body
  const response = await page.waitForResponse('**/todos/1');
  const responseBody = await response.text();
  console.log('Response Body:', responseBody);
});




test("Mocking API Response intercept test two", async ({ page }) => {
    await page.route('**/todos/1',  (route) => {
        console.log("Intercepting route");
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({ userId: 1, id: 1, title: "Post 1", body: "Post 1 body" })
        });
    });

    // Navigate to the page that makes the network request
  await page.goto('https://jsonplaceholder.typicode.com');

  // Perform actions that trigger the network request
  await page.click('button#run-button'); 

  // Wait for the response and get the response body
  const response = await page.waitForResponse('**/todos/1');
  const responseBody = await response.text();
  console.log('Response Body:', responseBody);
});