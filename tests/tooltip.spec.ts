import { test,expect } from "@playwright/test";

test("Tool Tip", async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();
  
  //hover
  page.getByRole('tooltip') // this works only if role tooltip is defined.
  await page.locator("nb-card", { hasText: "Tooltip Placements" }).getByRole('button',{name:"Top"}).hover();
  //generic assertion
  expect(await page.locator('nb-tooltip div span').textContent()).toEqual('This is a tooltip');

//locator assertion
 expect(page.locator('nb-tooltip div span')).toContainText('This is a tooltip');

});
