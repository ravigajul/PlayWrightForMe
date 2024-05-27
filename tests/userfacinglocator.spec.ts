import { test, expect } from "@playwright/test";

// Use the test.beforeEach hook to run setup code before each test.
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("User facing locators", async ({ page }) => {
  page.getByRole("button", { name: "SIGN IN" }); //button has name sign in
  page.getByRole("textbox", { name: "Email" }); //text box having name Email
  await page.getByLabel("Email").first().fill("Ravi.gajul@test.com"); //label tag
  await page.getByPlaceholder("Jane Doe").first().fill("Ravi Gajul"); //place holder attribute with value Jane Doe
  await page.getByText("Sign in").first().click(); //bt visible text on page
  await page.getByTitle("IOT Dashboard").first().click(); //element has title attribute
  //await page.getByTestId("1234") //data-testid is a reserved key word that we can add to application code as an attribute when we have dedicated ids in the application that we can add to application source code
});
