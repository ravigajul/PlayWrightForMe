import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page },testInfo) => {
  await page.goto("http://uitestingplayground.com/ajax");
  const ajaxButton = page.locator("#ajaxButton");
  await ajaxButton.click();
  testInfo.setTimeout(testInfo.timeout + 30000) //increasing the default timeout by 30 seconds
});

test("Time outs", async ({ page }) => {

//overwrites test timeout
test.setTimeout(30000)
  const successButton = page.locator(".bg-success");
  
//multiply the timeout by 3 times
test.slow()

  //overwrites action timeout
  //takes 15 seconds open the network tab to view
  await successButton.click({ timeout: 30000 }); //this will overwrite the actiontimeout set in config file
});
