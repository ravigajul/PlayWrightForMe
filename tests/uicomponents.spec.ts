import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test.describe("Form Layouts Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("Input Fields", async ({ page }) => {
    const usingTheGridEmailInput = page
      .locator("nb-card", { hasText: "Using the Grid" })
      .getByRole("textbox", { name: "Email" });

    await usingTheGridEmailInput.fill("Ravi.Gajul@test.com"); //enter email in email id input field
    await usingTheGridEmailInput.clear(); //clear the value you types. Cannot be chained.
    await usingTheGridEmailInput.pressSequentially("testing@test.com", {
      delay: 100,
    }); //simulating keyboard press of characters delaying the keystrokes by 2 seconds

    const inputValue = await usingTheGridEmailInput.inputValue(); //extracts value from input field
    expect(inputValue).toEqual("testing@test.com"); //generic assertion

    expect(await usingTheGridEmailInput).toHaveValue("testing@test.com"); //to have text will not work for input field
  });

  test("Radio Buttons", async ({ page }) => {
    const usingTheGridForm = page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    await usingTheGridForm.getByLabel("Option 1").check({ force: true }); //check the radio button. force:true is to ensure this is checked althorugh is not visually enabled. We see a class visually-disabled for this radio in source code.
    await usingTheGridForm
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });
    const radioStatus = await usingTheGridForm
      .getByRole("radio", { name: "Option 2" })
      .isChecked(); //checking the status of radio button
    expect(radioStatus).toBeTruthy();
    await expect(
      usingTheGridForm.getByRole("radio", { name: "Option 2" })
    ).toBeChecked();
    expect(
      await usingTheGridForm
        .getByRole("radio", { name: "Option 1" })
        .isChecked()
    ).toBeFalsy(); //checking the first radio is not selected.
  });
});

test("Check Boxes", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();
  await page
    .getByRole("checkbox", { name: "Hide on click" })
    .click({ force: true });
  await page
    .getByRole("checkbox", { name: "Prevent arising of duplicate toast" })
    .check({ force: true }); //will check if only unchecked.

  await page
    .getByRole("checkbox", { name: "Show toast with icon" })
    .uncheck({ force: true }); //will not uncheck as it is already checked.

  //check all check boxes
  const allCheckBoxes = page.getByRole("checkbox");
  for (const box of await allCheckBoxes.all()) {
    //.all will return array of locators
    await box.check({ force: true });
    expect(await box.isChecked()).toBeTruthy();

    //uncheck
    await box.uncheck({ force: true });
    expect(await box.isChecked()).toBeFalsy();
  }
});

test("Lists or Drop Downs", async ({ page }) => {
    await page.getByText("Modal & Overlays").click();
    
  });
  
