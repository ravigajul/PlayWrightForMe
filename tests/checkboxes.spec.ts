import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
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
