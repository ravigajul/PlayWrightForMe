import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  //In TypeScript, the ! post-fix expression operator 
  //is used to assert that its preceding expression is
  // non-null and non-undefined. In this case, 
  //it's asserting that process.env.URL is not null or undefined.
  await page.goto(process.env.URL!);
  const ajaxButton = page.locator("#ajaxButton");
  await ajaxButton.click();
});

test("Auto Wait", async ({ page }) => {
  const txtElement = page.locator("#content>p");
  const confirmMessage = await txtElement.textContent();

  //text in expect..generic assertion
  expect(confirmMessage).toEqual("Data loaded with AJAX get request.");

  //locator in assertion,...locator assertion
  //overwriting timeout to 40 seconds, default timeout is 30 seconds
  expect(txtElement).toHaveText("Data loaded with AJAX get request.", {
    timeout: 40000,
  });

  //explicit wait as allTextContents will immediately return without waiting for text although it returns promise
  await txtElement.waitFor({ state: "attached" });
  const allContents = await txtElement.allTextContents();

  expect(allContents).toContain("Data loaded with AJAX get request.");

  //wait for selector
  //await page.waitForSelector("#content>p");

  //wait for particular response
  //await page.waitForResponse("http://uitestingplayground.com/ajaxdata")

  //wait for network calls to be completed
  //await page.waitForLoadState("networkidle") //discouraged
});
