import { TIMEOUT } from "dns";
import { test } from "../test-options";
import { expect } from "@playwright/test";

test("Verify successful login for standard user", async ({
  page,
  sauceDemoPage,
}) => {
  const actualText = await page.locator("span.title").textContent();
  expect("Products").toEqual(actualText);
});

test("Add item to cart", async ({ page, sauceDemoPage }) => {
  for (const btn of await page
    .locator("//button[text()='Add to cart']")
    .all()) {
    await btn.click();
  }
});
