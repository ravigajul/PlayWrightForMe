import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
});

test("Web Tables", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  //row
  //const allRows = await page.getByRole('row'); // this will not work here as the aria-label = role is not defined.
  for (const row of await page.locator("tr.ng2-smart-row").all()) {
    let rowData: string[] = [];
    for (const col of await row
      .locator("table-cell-view-mode div.ng-star-inserted")
      .all()) {
       rowData.push(await col.innerText());
    }
    console.log(rowData);
  }
});
