import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./test-options";
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
// Load environment variables from .env file
 // Ensure the path is correct relative to the current file
 // If your .env file is in the root directory, adjust the path accordingly
 // For example, if your .env file is in the same directory as this config file:
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Load env file based on custom ENV variable
const envFile =  process.env.ENV || 'uat';

const envPath = path.resolve(process.cwd(), `.env.${envFile}`);

if (fs.existsSync(envPath)) {
   dotenv.config({ path: envPath });
} else {
   console.warn(`Warning: Environment file not found: ${envPath}`);
}
console.log('Using environment file:', envFile);
console.log('Path to environment file:', envPath);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig<TestOptions>({
  testDir: "./tests",
  //timeout: 20000, //test timeout
  //globalTimeout: 60000, //global timeout
  /* Run tests in files in parallel */
  /*  expect:{
    timeout:20000
  }, */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: "html",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: process.env.URL ? process.env.URL : "http://localhost:4200",
    globalsQAUrl: 'https://www.globalsqa.com/demo-site/draganddrop/',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: "on-first-retry",
    //actionTimeout:5000,
    //navigationTimeout:5000
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
