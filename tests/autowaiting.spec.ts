import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://uitestingplayground.com/ajax");
  const ajaxButton = page.locator("#ajaxButton");
  await ajaxButton.click();
});

test("Auto Wait", async ({ page }) => {
  const txtElement = page.locator("#content>p");
  const confirmMessage = await txtElement.textContent();
  expect(confirmMessage).toEqual("Data loaded with AJAX get request.");

  //explicit wait as allTextContents will immediately return without waiting for text although it returns promise
  await txtElement.waitFor({ state: "attached" });
  const allContents = await txtElement.allTextContents();

  expect(allContents).toContain("Data loaded with AJAX get request.");
});
