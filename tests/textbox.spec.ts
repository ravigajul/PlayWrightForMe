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

    expect(usingTheGridEmailInput).toHaveValue("testing@test.com"); //to have text will not work for input field
  });
});