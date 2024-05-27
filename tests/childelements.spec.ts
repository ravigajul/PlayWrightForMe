import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Child Elements", async ({ page }) => {
  //selecting nb-radio inside nb-card with text "Option-1"
  await page.locator('nb-card nb-radio :text-is("Option 2")').click();

  //alternate way by chaining element
  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(':text-is("Option 2")')
    .click();

  //find a 'Sign in' button combination of regular locator and facing locator
  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();


    //avoid this approach as the order of elements on dynamic pages changes
    await page.locator('nb-card').nth(3).getByRole('button').click()
});
