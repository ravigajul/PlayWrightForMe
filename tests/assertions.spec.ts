import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Generic & Locator Assertions", async ({ page }) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const basicFormButton = await basicForm.locator("button");
  //generic assertions
  const value = 1;
  expect(value).toEqual(1);

  const text = await basicFormButton.textContent();
  //expect receives a  text only and hence generic assertion
  expect(text).toEqual("Submit");

  //to have text. Works on fields other than textbox 
  // locator assertion expect receives locator and we can see multiple locator assertions
  await expect(basicFormButton).toHaveText("Submit");

  //to have value. works on textbox
  const txtEmail = page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" });
  await txtEmail.fill("testing@test.com");
  expect(txtEmail).toHaveValue("testing@test.com");
  //soft assertion. Test can continue even if assertion fails
  await expect.soft(basicFormButton).toHaveText("Submit");
  await basicFormButton.click(); //script will not abort even if above soft assertion fails as its soft assertion.

  //to be false
  expect(
    await page.getByRole("checkbox", { name: "Check me out" }).isChecked()
  ).toBeFalsy();

  //isChecked
  await page
    .getByRole("checkbox", { name: "Check me out" })
    .check({ force: true });
  expect(
    await page.getByRole("checkbox", { name: "Check me out" }).isChecked()
  ).toBeTruthy();

  //to have items
  await page.locator("ngx-header .select-button").click();
  await expect(page.locator("nb-option-list nb-option")).toHaveText([
    "Light",
    "Dark",
    "Cosmic",
    "Corporate",
  ]);

  //to have CSS
  expect(await page.locator("nb-layout-header")).toHaveCSS(
    "background-color",
    "rgb(255, 255, 255)"
  );

  //to contain
  const allRadioButtonsLabels = await page
    .locator("nb-radio")
    .allTextContents();
  expect(allRadioButtonsLabels).toContain("Option 1");

  //to be hidden/visible
  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'PW-test' })).toBeHidden();

  //not to have text
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  page.on('dialog',dialog=>{
      expect(dialog.message()).toEqual('Are you sure you want to delete?');
      dialog.accept();
  })
  //the dialog box is dismissed by default
  await page.getByRole('table').locator('tr',{hasText:"fat@yandex.ru"}).locator('.nb-trash').click();
  await expect(page.locator('table tr').first()).not.toHaveText('fat@yandex.ru');
});
