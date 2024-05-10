# PlayWrightForme

This is a repo document the playwright learnings
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

This creates a trace that looks very much like ui runner in the final report. This is very useful to run the test in CICD to analyse failures.
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

Import test method from playwright library 

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

## Locators unique to playwright

### Locate by partial and exact match

```javascript
page.locator(':text("partialtext")') //locator using partial text
page.locator (':text-is("exacttext")') //exact text match
```

### User Facing Locators

user facing locator.It has more than 50 attributes supported.

```javascript
await page.getByRole('textbox',{name:"Email"}).first().click();   
await page.getByRole('button',{name:"Sign in"}).first().click();    
await page.getByLabel('Email').first().fill('Ravi.gajul@test.com');  
await page.getByPlaceholder('Password').first().fill('Ravipassword');  
await page.getByText('Sign in').first().click();     
await page.getByTitle('IOT Dashboard').first().click();  
```
