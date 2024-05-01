# PlayWrightForme

This is a repo document the playwright learnings

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

## Run in a specific browser

```bash
npx playwright test --project=chromium
```

## Run in headed mode '

```bash
npx playwright test --project=chromium --headed
```

## Run a specific spec

```bash
npx playwright test  example.spec.ts --project=chromium --headed
```

## Run a specific test in a spec file

```bash
npx playwright test  -g "has title" --project=chromium --headed
```

## Skip a particular test

use test.skip
```bash
test.skip('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
```

## Run only a particular test

```bash
test.only('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});
```

## See the report

```bash
npx playwright show-report
```