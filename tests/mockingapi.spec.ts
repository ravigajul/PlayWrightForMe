import { test, expect } from "@playwright/test";
import errorResponse from "../errorResponse.json";
test("mocks a fruit and doesn't call api", async ({ page }) => {
  // Mock the api call before navigating
  await page.route("*/**/api/v1/fruits", async (route) => {
    //creating the mock object of the response to be rendered
    const json = errorResponse;

    //fullfulling the request
    await route.fulfill({ json });
  });

  // Go to the page
  await page.goto("https://demo.playwright.dev/api-mocking");

  // Assert that the Strawberry fruit is visible
  await expect(page.getByText("No Data found")).toBeVisible();
});

test('mock API response', async ({ page }) => {
  await page.route('https://jsonplaceholder.typicode.com/todos/1', route => {
    route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ id: 'mocked value' }),
    });
  });

await page.goto('https://jsonplaceholder.typicode.com/todos/1');
await expect(page.locator('pre')).toContainText('{"id":"mocked value"}');
});

test('Actual API response', async ({ page }) => {
await page.goto('https://jsonplaceholder.typicode.com/todos/1');
const text = await page.locator('pre').textContent();
const json = JSON.parse(text || '');
expect(json).toEqual({
  userId: 1,
  id: 1,
  title: 'delectus aut autem',
  completed: false
})});
