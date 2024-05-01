import { test, expect } from '@playwright/test';

// Use the test.beforeEach hook to run setup code before each test.
test.beforeEach(async ({ page }) => {
    await page.goto('https://demo.playwright.dev/todomvc');
        await expect(page).toHaveTitle(/TodoMVC/);
})
test.describe('first suite', () => {
    test('first test1', async ({ page }) => {
        
        await page.fill('input.new-todo', 'a new todo');
    });

    test('first test2', async ({ page }) => {
        
        await page.fill('input.new-todo', 'a new todo2');
    })
});