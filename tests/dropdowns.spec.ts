import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test("Lists or Drop Downs", async ({ page }) => {
  const dropDownMenu = page.locator("ngx-header .select-button");
  await dropDownMenu.click();

  page.getByRole("list"); //when the list has a ul tag.Parent container
  page.getByRole("listitem"); //when the list has li tag. All items in parent container

  const listItems = page.locator("nb-option-list nb-option");
  await expect(listItems).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);
  //select Cosmic of the available options
  await listItems.filter({ hasText: "Cosmic" }).click();

  //checking the background color
  expect(await page.locator("nb-layout-header")).toHaveCSS(
    "background-color",
    "rgb(50, 50, 89)"
  );

  const colors = {
    "Light": "rgb(255, 255, 255)",
    "Dark": "rgb(34, 43, 69)",
    "Cosmic": "rgb(50, 50, 89)",
    "Corporate": "rgb(255, 255, 255)"
  };

  //looping through items and validating respecive colors
  await dropDownMenu.click();
  for (const color in colors) {
    await listItems.filter({ hasText: color }).click();
    expect(page.locator("nb-layout-header")).toHaveCSS(
      "background-color", colors[color]
    );
    if(color!='Corporate'){
      await dropDownMenu.click();
    }
  }
  //validate the color of background is changed
  /* for(const item of await listItems.all()){
        await item.click();
        if(await item.textContent()!=='Corporate'){
          await dropDownMenu.click();
        }
    } */
});
