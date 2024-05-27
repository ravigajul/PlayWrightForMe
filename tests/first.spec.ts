import { test, expect } from "@playwright/test";

// Use the test.beforeEach hook to run setup code before each test.
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test.describe("First Test Suite", () => {
  test("Locator Syntax Rules", async ({ page }) => {
    // By tagname
    page.locator("input");

    // By id
    await page.locator("#inputEmail1").fill("ravi.gajul@test.com");

    //By class
    page.locator(".input-full-width");

    //By attribute
    page.locator('[placeholder="Email"]');

    //combine different selectors
    page.locator("input#inputPassword2");

    //By xpath not recommended
    page.locator("//input[@id=inputEmail1");

    //by partial text
    page.locator(':text("Using")');

    //by exact text
    page.locator(':text("Using the Grid")');
  });
});
