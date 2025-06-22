import { test as baseTest, Page } from '@playwright/test';

type Fixtures = {
    loggedInPage: Page;
};

const test = baseTest.extend<Fixtures>({
    // Define a custom fixture named 'loggedInPage'
    // This fixture will automatically log in the user before running the test
    // The 'use' function allows us to pass the page to the test
    loggedInPage: async ({ page }, use) => {  
        // This is a custom fixture that logs in the user before running the test
        await page.goto('https://practicetestautomation.com/practice-test-login/');
        await page.fill('#username', 'student');
        await page.fill('#password', 'Password123');
        await page.click('#submit');
        await use(page); //hand the logged in page to the test
    },
});
export { test };