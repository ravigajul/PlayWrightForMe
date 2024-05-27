# PlayWrightForMe

This is a repo to document the playwright learnings
Documentation : https://playwright.dev/docs/intro
Ngx-Admin Angular 14 application from https://github.com/bondar-artem/pw-practice-app

```bash
npm install --force
npm start
```

## Pre-requisites

    1. Nodejs
    2. Git
    3. VSCode
    4. PlayWright Extension

## Install Playwright

```bash
npm init playwright@latest
```

## Run the test through command line

By default this will run all the tests headlessly in three browsers defined in playwright.config.ts

```bash
npx playwright test
```

### Run in a specific browser

```bash
npx playwright test --project=chromium
```

### Run in headed mode '

```bash
npx playwright test --project=chromium --headed
```

### Run a specific spec

```bash
npx playwright test  example.spec.ts --project=chromium --headed
```

### Run a specific test in a spec file

```bash
npx playwright test  -g "has title" --project=chromium --headed
```

### Skip a particular test

use test.skip
```bash
test.skip('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
```

### Run only a particular test

```bash
test.only('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
```

### See the report

```bash
npx playwright show-report
```

## Run the test in UI Mode

1. Once you've installed the Playwright extension in VS Code, you'll notice an icon resembling a lab container. Click on it to reveal the available tests, which can be run individually or in batches. Simply click the play button to execute the selected tests.  
2. You can also run it directly from the spec file , by click on the play icon beside the test
3. using command line too ui mode can be executed

```bash
npx playwright test --ui
```
The third step opens a cypress like editor to play the tests to be executed. This displays the screenshots and other metrics like cypress.

### Re-Run the test after making edits

In the above editor, click on the eye like icon beside the test step. The editor then waits for any changes to be done to the code and get executed after the code changes.

### Run in headed mode using UI

In the bottom left corner of the screen enable the check box "Show Browser" to run in headed mode. By default UI execution also run in headless mode.

### Run on a specific browser

Click on the drop down like icon beside play button at test explorer level (select configuration) and select the default profile you would like to execute it on.

### Time of execution of each step

After the test is executed beside each step time in milliseconds is displayed.

## Trace View and Debug

The index.html report shows all the traces along with a zip file attached,traces.This creates a trace that looks very much like ui runner in the final report. This is very useful to run the test in CICD to analyse failures.
Trace is set to 'on-first-retry' in playwright.config.ts (trace: 'on-first-retry',). we can set it to always on trace: 'on'

```bash
npx playwright test --project=chromium --trace on
```

### Use Playwright inspector for debugging

This opens the runner and playwright inspector that serves as a debugger.

```bash
npx playwright test --project=chromium --debug 
```

### Use built in debugger in test explorer

Put a break point at the line where you want to stop, in the test explorer run the debug button. It runs in the debug mode. This is a preffered way as it shows variable values by hovering over them.


## Tests Structure

Import test method from playwright library.

```bash
import {test} from '@playwright/test'
test('name of the test1',()=>{
    //code goes over here
})
test('name of the test2',()=>{
    //code goes over here
})
test('name of the test3',()=>{
    //code goes over here
})
test('name of the test4',()=>{
    //code goes over here
})
```

### Group tests

Using test.describe we can group multiple tests into a suite.

```bash

test.describe('Test Suite1',()=>{
    test('name of the test1',()=>{
    //code goes over here
})
test('name of the test2',()=>{
    //code goes over here
})
})
```

### Open the web page

Using async await as the function goto returns a promise that needs to be resolved. await is needed only for the functions that return promise.

```bash
test('name of the test2',async ({page})=>{
   await page.goto('https://www.example.com');
})
```

## Hooks and Control Flow

beforeEach,beforeAll, afterEach and afterAll hooks are supported in playwright. This can be kept at above or within suite level so that it works for 
all suits or a particular test with in the suite.

```javascript
// Use the test.beforeEach hook to run setup code before each test.
test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
        await expect(page).toHaveTitle(/TodoMVC/);
})
```

## Locators

```javascript
await page.getByText('Forms').click();  //Visible text on the page
//by partial text
await page.locator(':text("Using")').click()  
//by exact text
 await page.locator(':text("Using the Grid")').click()

```

## Locators unique to playwright

### Locate by partial and exact match

```javascript
page.locator(':text("partialtext")') //locator using partial text
page.locator (':text-is("exacttext")') //exact text match
```

### User Facing Locators

user facing locator.It has more than 50 attributes supported.
https://playwright.dev/docs/best-practices#testing-philosophy

```javascript
page.getByRole("button", { name: "SIGN IN" }); //button has name sign in
page.getByRole("textbox", { name: "Email" }); //text box having name Email
await page.getByLabel("Email").first().fill("Ravi.gajul@test.com"); //label tag
await page.getByPlaceholder("Jane Doe").first().fill("Ravi Gajul"); //place holder attribute with value Jane Doe
await page.getByText("Sign in").first().click(); //bt visible text on page
await page.getByTitle("IOT Dashboard").first().click(); //element has title attribute
//await page.getByTestId("1234") //data-testid is a reserved key word that we can add to application code as an attribute when we have dedicated ids in the application that we can add to application source code
```

```javascript
await page.getByRole('textbox',{name:"Email"}).first().click();   
await page.getByRole('button',{name:"Sign in"}).first().click();    
await page.getByLabel('Email').first().fill('Ravi.gajul@test.com');  
await page.getByPlaceholder('Password').first().fill('Ravipassword');  
await page.getByText('Sign in').first().click();     
await page.getByTitle('IOT Dashboard').first().click();  
```

## Locating Child Elements

```javascript
//selecting nb-radio inside nb-card with text "Option-1"
  await page.locator('nb-card nb-radio :text-is("Option 2")').click();

  //alternate way by chaining element
  await page
    .locator("nb-card")
    .locator("nb-radio")
    .locator(':text-is("Option 2")')
    .click();

  //find a 'Sign in' button combination of regular locator and facing locator
  await page
    .locator("nb-card")
    .getByRole("button", { name: "Sign in" })
    .first()
    .click();


    //avoid this approach as the order of elements on dynamic pages changes
    await page.locator('nb-card').nth(3).getByRole('button').click()
```

## Parent Elements

```javascript
//providing a second attribute hasText
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Password" })
    .click();

  //providing a second attribute has 
  await page
    .locator("nb-card", { has: page.locator("#inputEmail1") })
    .getByRole("textbox", { name: "Password" })
    .click();

//similar to above but has a seperate filter method.
    await page.locator('nb-card').filter({hasText:"Basic form"}).click();
    await page.locator("nb-card").filter({has:page.locator('.status-danger')}).click();


  //find the email input field for horizontal form
  await page.locator('nb-card').filter({has:page.locator('nb-checkbox')}).filter({hasText:'Sign in'}).click();

  //just go one level up
    await page.locator(':text("using the Grid")').locator('..').getByRole('textbox',{name:"Email"}).click();

```

## Reuse Locators

```javascript
const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
const emailField = basicForm.getByRole("textbox", { name: "Email" });
const passwordField = basicForm.getByRole("textbox", { name: "Password" });
const submitButton = basicForm.getByRole("button");
await emailField.fill("Ravi.Gajul@test.com");
await passwordField.fill("Testing!123");
await submitButton.click();
await expect(emailField).toHaveValue("Ravi.Gajul@test.com");
```

## Extracting values from elements

```javascript
//textContent
  expect(buttonText).toEqual("Submit");

  //allTextContents
  const allRadioButtonsLabels = await page.locator("nb-radio").allTextContents();
  expect(allRadioButtonsLabels).toContain("Option 1");

  //input value
  const emailField = basicForm.getByRole('textbox',{name:'Email'})
  await emailField.fill("Ravi.Gajul@test.com")
  expect(await emailField.inputValue()).toEqual("Ravi.Gajul@test.com");

  //get attribute value
  const placeHolderValue = await emailField.getAttribute('placeholder');
  expect(placeHolderValue).toEqual('Email')
```

## Assertions

```javascript
const basicForm = page.locator("nb-card").filter({ hasText: "Basic form" });
const basicFormButton = await basicForm.locator("button")
//generic assertions
const value =1;
expect(value).toEqual(1);

const text = await basicFormButton.textContent();
//expect receives a  text only and hence generic assertion. Mouse over toEqual method
expect(text).toEqual('Submit');

//locator assertion expect receives locator and we can see multiple locator assertions . Mouseover the toHaveText method (this method would not have shown if the expect has text instead of locator)
await expect(basicFormButton).toHaveText('Submit')

//soft assertion. Test can continue even if assertion fails
await expect.soft(basicFormButton).toHaveText('Submit');
await basicFormButton.click()//click would still happen even if above soft assertion failed

```

## Explicity waiting for a particlar state

```javascript
//explicitly wait for element state to be attached
await txtElement.waitFor({ state: "attached" });
const allContents = await txtElement.allTextContents();
expect(allContents).toContain("Data loaded with AJAX get request.");

//overload timeout
expect(successButton).toHaveText('data loaded',{timeout:30000});
```
