import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Extracting submit button text from submit button on basic form", async ({
  page
}) => {
  const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
  const buttonText = await basicForm.locator("button").textContent();

  //textContent
  expect(buttonText).toEqual("Submit");

  //allTextContent
  const allRadioButtonsLabels = await page
    .locator("nb-radio")
    .allTextContents();
  expect(allRadioButtonsLabels).toContain("Option 1");

  //input value
  const emailField = basicForm.getByRole('textbox',{name:'Email'})
  await emailField.fill("Ravi.Gajul@test.com")
  expect(await emailField.inputValue()).toEqual("Ravi.Gajul@test.com");

  //get attribute value
  const placeHolderValue = await emailField.getAttribute('placeholder');
  expect(placeHolderValue).toEqual('Email')
});
