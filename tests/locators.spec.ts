import { test, expect } from "@playwright/test";

// Use the test.beforeEach hook to run setup code before each test.
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test.describe("Test suite to demo locators", () => {
  test("Locator Syntax Rules", async ({ page }) => {
    //by TagName
    page.locator("input"); //locator method is not returning promise hence no await
    await page.locator("input").first().click(); //click returns promoise hence await.
    //by id
    page.locator("#inputEmail");

    //by class value
    page.locator(".shape-rectangle"); //. is class, # is id and just 'input' is tag

    //by attribute
    page.locator('[placeholder="Email"]');

    //by entire class value (full)
    page.locator(
      '[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]'
    );

    //combine different selectors
    page.locator('input[placeholder="Email"].shape-rectangle'); //using input tag , place holder attribute and class

    //by Xpath
    page.locator('//*[@id="inputEmail"]'); //xpath is not recommended based on playwright documentation : https://playwright.dev/docs/other-locators#xpath-locator

    //by partial text match
    page.locator(':text("Using")');

    //by exact text match
    page.locator(':text("Using the Grid")');
  });
});
