# PlayWrightForMe

This is a repo to document the playwright learnings
Documentation : https://playwright.dev/docs/intro
Ngx-Admin Angular 14 application from https://github.com/bondar-artem/pw-practice-app

```bash
npm install --force
npm start
```
## Disable Strict SSL checking if need be 
'''
 npm config set strict-ssl false
'''

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
await expect(basicFormButton).toHaveText('Submit');

//toHaveText will not work for input fields. We have to use toHaveValue
expect (await usingTheGridEmailInput).toHaveValue('testing@test.com');

//not to have 
 await expect(page.locator('table tr').first()).not.toHaveText('fat@yandex.ru');
 
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
```

## Overwrite timeout

```javascript
//overload timeout
expect(successButton).toHaveText('data loaded',{timeout:30000});
```

## Other waits

```javascript
//wait for selector
  await page.waitForSelector("#content>p");

  //wait for particular response
  await page.waitForResponse("http://uitestingplayground.com/ajaxdata");

  //wait for network calls to be completed
  await page.waitForLoadState("networkidle"); //discouraged
  ```

## Timeouts

1. Playwright has globaltimeout, testTimeout, action and navigationTimeout.
2. action & navigationTimeout always less then test timeout
3. testtimeout is always less than globaltimeout.
4. only testimeout has default configuration of 30 seconds
5. expect timeout has default confifuation of 5 seconds
6. The rest of the timouts have no default configurations.
7. plawright.config.ts is the place where we can configure timeouts.
8. The values in playwright.config.ts can be overridden with spec file 
9. Even if actiontimeout declared is more than  timeout in config file, it will still not wait for more than timeout(testtimeout)

```javascript
timeout: 10000, //test timeout
globalTimeout: 30000, //global timeout
expect : {
    timeout: 10000
},
use:{
    actionTimeout:5000 
    navigationTimeout:5000
}
```

### ways to overwrite

```javascript
//suite level
test.beforeEach(async ({ page },testInfo) => {
  await page.goto("http://uitestingplayground.com/ajax");
  const ajaxButton = page.locator("#ajaxButton");
  await ajaxButton.click();
  testInfo.setTimeout(testInfo.timeout + 30000) //increasing the default timeout by 30 seconds
});

//overwrites test timeout
test.setTimeout(30000);

//multiply the timeout by 3 times
test.slow()

//action timeout
await successButton.click({ timeout: 30000 })
```

## UI Actions

### Text Box

```javascript
//Input Field
await page.locator('inputfield').fill('test'); //to fill value to input field
await page.locator('inputfield').clear(); //clear values
await page.locator('inputfield').pressSequentially('testing'); //simulate keyboard inputs
expect (await usingTheGridEmailInput).toHaveValue('testing@test.com'); //to have text will not work for input elements
```

### Radio Button

```javascript
//Radio button
check()
check({force:true}) //if invisible
await expect(locator).toBeChecked(); //locator assertion
expect(radio.isChecked()).toBeTruthy();
expect(radio.isChecked()).toBeFalsy();
```

### Check Box

```javascript
//checkbox 
await page.getByRole("checkbox", { name: "Hide on click" }).click({ force: true }); //will not check the status of check

//Ensure that element is a checkbox or a radio input. If not, this method throws. If the element is already checked, this method returns immediately.
await page.getByRole("checkbox", { name: "Prevent arising of duplicate toast" }).check({force:true}); 
await page.getByRole("checkbox", { name: "Show toast with icon" }).uncheck({force:true}); //will not uncheck as it is already checked.

//select all checkboxes
//When the locator points to a list of elements, all() returns an array of locators, pointing to their respective elements. 
for (const box of await page.getByRole('checkbox').all()){
    await box.check();
}
    
```

## List Items or DropDown

```javascript
page.getByRole('list'); //when the list has a ul tag.Parent container
page.getByRole('listitem'); //when the list has li tag. All items in parent container
await expect(listItems).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]); //validate list content
await listItems.filter({ hasText: "Cosmic" }).click(); //select the items from the list
const listItems = page.locator("nb-option-list nb-option");
await listItems.filter({hasText:"Cosmic"}).click();
//loop through the list
for(const item of await listItems.all()){ //all() converts to locator array
  await item.click();
  if(await item.textContent()!=='Corporate'){
    await dropDownMenu.click();
  }
}
```

## ToolTip

Press F8 when in source tab of developer tools to pause the debugger on mouse hover so that you can inspect the tool tip

```javascript

page.getByRole('tooltip') // this works only if role tooltip is defined.
//hover method
await page.locator("nb-card", { hasText: "Tooltip Placements" }).getByRole('button',{name:"Top"}).hover();
expect(await page.locator('nb-tooltip div span').textContent()).toEqual('This is a tooltip');
```

## Dialog Boxes

By default, playwright dismisses the window alerts. We shall create a listener,
which is Emitted when a JavaScript dialog appears, such as alert, prompt, confirm or beforeunload. Listener must either dialog.accept([promptText]) or dialog.dismiss() the dialog - otherwise the page will freeze waiting for the dialog, and actions like click will never finish.
Note : When no page.on('dialog') or browserContext.on('dialog') listeners are present, all dialogs are automatically dismissed.

```javascript
page.on('dialog',dialog=>{
expect(dialog.message()).toEqual('Are you sure you want to delete?');
dialog.accept();
 })
//the dialog box is dismissed by default
await page.getByRole('table').locator('tr',{hasText:"fat@yandex.ru"}).locator('.nb-trash').click();
await expect(page.locator('table tr').first()).not.toHaveText('fat@yandex.ru');
```

## WebTables

## Date Pickers

```javascript
test("Date Picker", async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();
  const calendarInputField = await page.getByPlaceholder("Form Picker");
  await calendarInputField.click();
  //here 30 matches with april 30 as well as May 30 in current view. The difference is class="bounding-month day-cell ng-star-inserted" for the previous month and class="day-cell ng-star-inserted" for the current month
  let date = new Date();
  date.setDate(date.getDate() + 100); //to ensure 28+4 is 1st june and not 32
  const expectedDate = date.getDate().toString(); //getDate returns number so converting to string
  const expectedShortMonth = date.toLocaleString("En-US", { month: "short" });
  const expectedLongMonth = date.toLocaleString("En-US", { month: "long" });
  const expectedYear = date.getFullYear();
  const dateToAssert = `${expectedShortMonth} ${expectedDate}, ${expectedYear}`;

  let calendarMonthAndYear = await page
    .locator("nb-calendar-view-mode")
    .textContent();
  const expectedMonthAndYear = ` ${expectedLongMonth} ${expectedYear}`;
  while (!calendarMonthAndYear?.includes(expectedMonthAndYear)) {
    await page
      .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
      .click();
    calendarMonthAndYear = await page
      .locator("nb-calendar-view-mode")
      .textContent();
  }
  await page
    .locator('[class="day-cell ng-star-inserted"]')
    .getByText(expectedDate, { exact: true }) //if the value is 1 it matches with 1 and 11 to 19 . exact match to avoid this.
    .click();
  expect(calendarInputField).toHaveValue(dateToAssert);
});
```

## Sliders - Simulating mouse operations

```javascript
await page.goto("http://localhost:4200/pages/iot-dashboard");
  
  //update attributes using javascript
  const tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
  await tempGauge.evaluate(node=>{
    node.setAttribute('cx','232.630'),
    node.setAttribute('cy','232.630')
  }) //this will just slide the circle but event is not triggered
  await tempGauge.click(); //this will trigger the event
  
  //simulating mouse movement
  const tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
  await tempBox.scrollIntoViewIfNeeded() //scrolling into view 

  const box = await tempBox.boundingBox();
  if(box){
  const x = box.x + box.width/2;
  const y = box.y + box.height/2;
  await page.mouse.move(x+100, y);
  await page.mouse.down();
  await page.mouse.move(x + 100, y);
  await page.mouse.move(x + 100, y+100);
  await page.mouse.up();
  await expect(tempBox).toContainText('30');
  }

```

## Drag and Drop with iFrames

## Authentication

### Preserve authenticated state

Run codegen with --save-storage to save cookies and localStorage at the end of the session. This is useful to separately record an authentication step and reuse it later when recording more tests.

```javascript
npx playwright codegen  github.com/microsoft/playwright --save-storage=auth.json
```

```javascript
test.use({storageState:'auth.json'});

test('test',async ({page})=>{
    await page.goto ('https://github.com/microsoft/playwright')
})
```

### Load authenticated state

Run with --load-storage to consume the previously loaded storage from the auth.json. This way, all cookies and localStorage will be restored, bringing most web apps to the authenticated state without the need to login again. This means you can can continue generating tests from the logged in state.


```javascript
npx playwright codegen --load-storage=auth.json github.com/microsoft/playwright
```

## Mocking API Response

https://playwright.dev/docs/mock

```javascript
import { test, expect } from "@playwright/test";
test("mocks a fruit and doesn't call api", async ({ page }) => {

  // Mock the api call before navigating
  await page.route("*/**/api/v1/fruits", async (route) => {

    //creating the mock object of the response to be rendered
    const json = [{ name: "No Data found" }];

    //fullfulling the request
    await route.fulfill({ json });
  });
  
  // Go to the page
  await page.goto("https://demo.playwright.dev/api-mocking");

  // Assert that the Strawberry fruit is visible
  await expect(page.getByText("No Data found")).toBeVisible();
});

```

## Intercepting API Response
```javascript

test('ntercept network request and get response body', async ({ page }) => {
  // Intercept the network request
  await page.route('**/todos/1', (route) => route.continue());

  // Navigate to the page that makes the network request
  await page.goto('https://jsonplaceholder.typicode.com');

  // Perform actions that trigger the network request
  await page.click('button#run-button'); 

  // Wait for the response and get the response body
  const response = await page.waitForResponse('**/todos/1');
  const responseBody = await response.text();
  console.log('Response Body:', responseBody);
});
```
Let's break down the Playwright code step by step:

1. **Test Definition**:
   ```javascript
   test('intercept network request and get response body', async ({ page }) => {
   ```
   This line defines a test case named "intercept network request and get response body" using Playwright's test framework. The `async ({ page })` part indicates that the test function is asynchronous and will use a `page` object provided by Playwright.

2. **Intercept Network Request**:
   ```javascript
   await page.route('**/todos/1', (route) => route.continue());
   ```
   This line sets up a route to intercept network requests matching the URL pattern `**/todos/1`. The `route.continue()` method allows the request to proceed without modification.

3. **Navigate to the Page**:
   ```javascript
   await page.goto('https://jsonplaceholder.typicode.com');
   ```
   This line navigates the browser to the specified URL, which is a placeholder API for testing purposes.

4. **Trigger the Network Request**:
   ```javascript
   await page.click('button#run-button');
   ```
   This line simulates a click on a button with the ID `run-button`. This action is expected to trigger the network request to `**/todos/1`.

5. **Wait for the Response**:
   ```javascript
   const response = await page.waitForResponse('**/todos/1');
   ```
   This line waits for the network response from the URL `**/todos/1`. The `page.waitForResponse` method returns a `Response` object once the request is completed.

6. **Get the Response Body**:
   ```javascript
   const responseBody = await response.text();
   console.log('Response Body:', responseBody);
   ```
   These lines extract the response body as a text string using `response.text()` and log it to the console.

## Retries

```javascript
# Give failing tests 3 retry attempts
npx playwright test --retries=3
```

### Retries configured in playwright.config.ts

```javascript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Give failing tests 3 retry attempts
  retries: 3,
});
```

###  Retries for group of tests

You can specify retries for a specific group of tests or a single file with test.describe.configure().

```javascript
import { test, expect } from '@playwright/test';

test.describe(() => {
  // All tests in this describe group will get 2 retry attempts.
  test.describe.configure({ retries: 2 });

  test('test 1', async ({ page }) => {
    // ...
  });

  test('test 2', async ({ page }) => {
    // ...
  });
});
```

## Environment Variables

https://playwright.dev/docs/test-projects#configure-projects-for-multiple-environments

plawright.config.ts

```javascript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60000, // Timeout is shared between all tests.
  projects: [
    {
      name: 'staging',
      use: {
        baseURL: 'staging.example.com',
      },
      retries: 2,
    },
    {
      name: 'production',
      use: {
        baseURL: 'production.example.com',
      },
      retries: 0,
    },
  ],
});
```

## Environment Variable dotenv

Install the dotenv package and uncomment the require('dotenv').config() from playwright.config.ts. o pass an environment variable from the command line in Windows, you can use the set command before the actual command, and separate them with && in package.json script

```javascript
script:{
"autowaittest": "set URL=http://uitestingplayground.com/ajax && npx playwright test usePageObjects.spec.ts --project=chromium --headed"
}
```

Alternatively, set it up in playwright config file  using ternary operator shown below

## Ternary operator to set default env if not set

```javascript
baseURL: process.env.URL ? process.env.URL : "http://localhost:4200",
```

## TestOptions

Playwright Test provides many options to configure test environment, Browser, BrowserContext and more. https://playwright.dev/docs/api/class-testoptions  
To Extend beyond the playwright provided testoptions like defining your own environment variables, do this.

  1. Create test-options.ts file
  2. Extend base to have your own variables
  3. Import test options in playwright config and ensure config uses <TestOptions>
  4. Add userdefined url in use of config.
  5. Instead of importing test from paywright test import test from test-options.ts in your tests

```javascript
export default defineConfig<TestOptions>({})
  ```

## Fixtures

Playwright Test is based on the concept of test fixtures. Test fixtures are used to establish the environment for each test, giving the test everything it needs and nothing else. Test fixtures are isolated between tests. With fixtures, you can group tests based on their meaning, instead of their common setup. https://playwright.dev/docs/test-fixtures
## Adding tags 
In Playwright, you can add tags as part of the test definition's metadata. Here's an example of how to define tags for tests:
```
test('sort by with api mocking', { tag: '@mocking' }, async ({ page }) => {
  // Mock the API call for sorting by popularity
  await page.route('*/**/**sort_by=popularity.desc', async (route) => {
    await route.fulfill({
      path: path.join(__dirname, '../mocks/sort-by-popularity.json'),
    });
  });
});
```
In this example, we've tagged the test with a "@mocking" tag. This metadata will be used to filter tests in reports or command-line execution.

**Running Tests by Tags**
To run tests with specific tags, you can use the --grep flag followed by a tag name:
```
npx playwright test --grep @mocking
```
To exclude tests with a specific tag, use the --grep-invert flag:
```
npx playwright test --grep-invert @mocking
```


## Trouble shooting
1. If you encounter no tests found, ensure that the test is named *.spec.ts or *.test.ts . The file should be having keywords spec or test and having extensions .ts or .js or .mjs. - https://playwright.dev/docs/test-configuration#filtering-tests
2. Remember to use forward slashed when running the tests through cli - https://playwright.dev/docs/test-cli
3. When the debug doesn't work with playwright test for vscode extension,  downgrade vscode extension to 1.0.22.

## References

1. https://playwright.dev/docs/intro
2. https://github.com/microsoft/playwright
