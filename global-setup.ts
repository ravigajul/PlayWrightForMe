import { FullConfig } from "playwright/test";
import fs from "fs";

async function globalSetup(config: FullConfig) {
    // Check if the environment file exists
    const envFile = process.env.ENV_FILE || 'qa'; // Default to 'qa' if not set
    console.log(`Using environment file: ${envFile}`);
    const envPath = `./.env.${envFile}`;

    if (fs.existsSync(envPath)) {
        // Load the environment variables from the specified file
        require('dotenv').config({ path: envPath });
        console.log(`Using environment file: ${envFile}`);
    } else {
        console.warn(`Warning: Environment file not found: ${envPath}`);
    }

    // Log the base URL to verify it's set correctly
    console.log('Base URL:', process.env.URL);

        const {chromium} = require('@playwright/test');
        const browser = await chromium.launch({ headless: false, slowMo: 1000 });
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto('https://practicetestautomation.com/practice-test-login/');
        await page.fill('#username', 'student');
        await page.fill('#password', 'Password123');
        await page.click('#submit');
        // Save the logged-in page to the context for use in tests
        await page.context().storageState({ path: 'auth.json' });
        await browser.close();
}       
       
export default globalSetup;
