# PlayWrightForme

This is a repo document the playwright learnings

## Pre-requisites

    1. Nodejs
    2. Git
    3. VSCode
    4. PlayWright Extension

## Install Playwright

    1. Npm init playwright@latest

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

## See the report

```bash
npx playwright show-report
```