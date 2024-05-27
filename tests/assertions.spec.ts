import { test,expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test('Generic Assertions',async({page})=>{
    const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
    const basicFormButton = await basicForm.locator("button")
    //generic assertions
    const value =1;
    expect(value).toEqual(1);

    const text = await basicFormButton.textContent();
    //expect receives a  text only and hence generic assertion
    expect(text).toEqual('Submit');

    //locator assertion expect receives locator and we can see multiple locator assertions 
    await expect(basicFormButton).toHaveText('Submit')

    //soft assertion. Test can continue even if assertion fails
    await expect.soft(basicFormButton).toHaveText('Submit');
    await basicFormButton.click(); //script will not abort even if above soft assertion fails as its soft assertion.
});