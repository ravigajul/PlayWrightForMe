import { test, expect } from "@playwright/test";

// Use the test.beforeEach hook to run setup code before each test.
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Reusing Locators ", async ({ page }) => {
  //crude form where lot of lines are repleated
  await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .getByRole("textbox", { name: "Email" })
    .fill("Ravi.Gajul@test.com");
  await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .getByRole("textbox", { name: "Password" })
    .fill("Testing!123");
  await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .getByRole("button")
    .click();

  //reuse form where repeated code is assigned to a constant
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const emailField = basicForm.getByRole("textbox", { name: "Email" });
  const passwordField = basicForm.getByRole("textbox", { name: "Password" });
  const submitButton = basicForm.getByRole("button");
  await emailField.fill("Ravi.Gajul@test.com");
  await passwordField.fill("Testing!123");
  await submitButton.click();
  await expect(emailField).toHaveValue("Ravi.Gajul@test.com");
});
