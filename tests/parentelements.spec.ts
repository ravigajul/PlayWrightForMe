import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locating Parent Elements", async ({ page }) => {

//providing a second attribute hasText
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Password" })
    .click();

  //providing a second attribute has 
  await page
    .locator("nb-card", { has: page.locator("#inputEmail1") })
    .getByRole("textbox", { name: "Password" })
    .click();

//similar to above but has a seperate filter method.
    await page.locator('nb-card').filter({hasText:"Basic form"}).click();
    await page.locator("nb-card").filter({has:page.locator('.status-danger')}).click();


  //find the email input field for horizontal form
  await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:'Sign in'}).click();

//just go one level up
    await page.locator(':text("using the Grid")').locator('..').getByRole('textbox',{name:"Email"}).click();
});
