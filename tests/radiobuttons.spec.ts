import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test.describe("Form Layouts Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
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
