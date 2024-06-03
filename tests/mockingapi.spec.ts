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
