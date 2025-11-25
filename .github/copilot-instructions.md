# GitHub Copilot Instructions for Playwright with TypeScript

## Project Context
This is a Playwright test automation project using TypeScript. Follow these guidelines when generating code suggestions.

## Core Principles

### 1. Test Structure & Organization
- Use descriptive test names that clearly state the expected behavior
- Follow the AAA pattern: Arrange, Act, Assert
- Group related tests using `test.describe()` blocks
- Use `test.beforeEach()` and `test.afterEach()` for setup and teardown
- Keep tests independent and isolated - no test should depend on another

### 2. TypeScript Best Practices
- Always use strict TypeScript typing
- Avoid using `any` type - use proper interfaces and types
- Define interfaces for test data and page object methods
- Use `const` for immutable values, `let` only when necessary
- Enable and respect ESLint and TypeScript compiler warnings

### 3. Locator Strategies (Priority Order)
1. **User-facing attributes** (preferred):
   - `getByRole()` - for accessibility and semantic HTML
   - `getByLabel()` - for form fields
   - `getByPlaceholder()` - for input fields
   - `getByText()` - for visible text content
   - `getByAltText()` - for images
2. **Test IDs** (when user-facing locators aren't reliable):
   - `getByTestId()` - use data-testid attributes
3. **CSS/XPath** (last resort):
   - Avoid brittle selectors tied to implementation details
   - Never use auto-generated selectors

### 4. Page Object Model (POM)
- Create page objects for reusable page interactions
- Store locators as methods or getters, not static selectors
- Page objects should return promises or other page objects
- Keep page objects focused on a single page or component
- Example structure:
```typescript
export class LoginPage {
  constructor(private page: Page) {}

  async navigate() {
    await this.page.goto('/login');
  }

  async login(username: string, password: string) {
    await this.page.getByLabel('Username').fill(username);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }
}
```

### 5. Waiting & Synchronization
- Rely on auto-waiting - Playwright waits automatically for elements
- Avoid explicit waits like `page.waitForTimeout()` unless absolutely necessary
- Use `waitForLoadState()` for page loads when needed
- Use `waitForResponse()` or `waitForRequest()` for API calls
- For custom conditions, use `page.waitForFunction()`

### 6. Assertions
- Use Playwright's built-in assertions with auto-retry:
  - `await expect(locator).toBeVisible()`
  - `await expect(locator).toHaveText()`
  - `await expect(locator).toContainText()`
  - `await expect(page).toHaveURL()`
  - `await expect(page).toHaveTitle()`
- Avoid Jest/Chai assertions for web elements
- Use soft assertions with `expect.soft()` when you want tests to continue after failures
- Add custom error messages for clarity: `await expect(element).toBeVisible({ timeout: 5000 })`

### 7. Test Data Management
- Use fixtures for test data setup
- Store test data in separate files (JSON, CSV, or TypeScript constants)
- Use environment variables for configuration
- Never hardcode sensitive data - use `.env` files
- Parameterize tests with `test.describe.parallel()` for data-driven testing

### 8. API Testing & Mocking
- Use `page.route()` to intercept and mock API responses
- Use `request` context for API testing
- Validate API responses with proper TypeScript types
- Mock external dependencies to ensure test reliability
- Example:
```typescript
await page.route('**/api/users', async (route) => {
  await route.fulfill({
    status: 200,
    body: JSON.stringify({ users: [...] })
  });
});
```

### 9. Error Handling & Debugging
- Add screenshots on failure: configured in `playwright.config.ts`
- Use `test.step()` for better error reporting
- Add trace collection for debugging: `trace: 'on-first-retry'`
- Use descriptive error messages in assertions
- Log important state information before assertions

### 10. Performance & Parallelization
- Run tests in parallel by default (configured per project)
- Use `test.describe.serial()` only when tests must run sequentially
- Avoid unnecessary navigation - reuse page state when possible
- Use `storageState` for authentication to avoid repeated logins
- Share expensive setup using `test.beforeAll()` when safe

### 11. Configuration Best Practices
- Use multiple projects for different browsers/devices
- Set appropriate timeouts (default: 30s for actions, 60s for tests)
- Configure retries for flaky tests (max 2 retries recommended)
- Use different base URLs for different environments
- Enable video/screenshots only on failure to save space

### 12. Accessibility Testing
- Use `getByRole()` as primary locator strategy
- Test keyboard navigation with `page.keyboard.press()`
- Validate ARIA attributes and labels
- Consider using `@axe-core/playwright` for automated a11y testing

### 13. Mobile & Responsive Testing
- Use device emulation from `playwright.devices`
- Test viewport changes with `page.setViewportSize()`
- Verify touch interactions on mobile devices
- Test responsive layouts across breakpoints

### 14. Code Quality
- Follow DRY principle - extract common actions to helper functions
- Use meaningful variable and function names
- Add JSDoc comments for complex page objects or utilities
- Keep test files under 300 lines - split large suites
- Use async/await consistently, never mix with .then()

### 15. Fixtures & Custom Hooks
- Create custom fixtures for common test dependencies
- Use fixtures for test isolation and cleanup
- Define fixture types properly
- Example:
```typescript
type MyFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<MyFixtures>({
  authenticatedPage: async ({ page }, use) => {
    await page.goto('/login');
    // perform login
    await use(page);
    // cleanup if needed
  },
});
```

### 16. Visual Testing
- Use `expect(page).toHaveScreenshot()` for visual regression
- Configure screenshot comparison thresholds appropriately
- Update snapshots intentionally, review changes carefully
- Use visual testing sparingly - it's slower than functional tests

### 17. Common Anti-Patterns to Avoid
- ❌ Don't use `page.waitForTimeout()` for synchronization
- ❌ Don't chain too many actions without assertions
- ❌ Don't use CSS selectors based on styling classes
- ❌ Don't share state between tests
- ❌ Don't skip proper error handling
- ❌ Don't ignore TypeScript errors
- ❌ Don't use `any` type to bypass type checking
- ❌ Don't hardcode wait times
- ❌ Don't test implementation details

### 18. File Naming Conventions
- Test files: `*.spec.ts` or `*.test.ts`
- Page objects: `*Page.ts` or `*.page.ts`
- Fixtures: `*Fixture.ts` or `*.fixture.ts`
- Utilities: `*-utils.ts` or `*.utils.ts`
- Use kebab-case or camelCase consistently

### 19. Git & CI/CD Integration
- Run tests in CI pipeline on every PR
- Use sharding for faster CI execution
- Store test reports as artifacts
- Use `--reporter=html,junit` for CI reporting
- Configure GitHub Actions or similar for automated testing

### 20. Documentation
- Add README with setup instructions
- Document custom fixtures and utilities
- Include examples for common test patterns
- Maintain changelog for test framework updates
- Document environment variables and configuration

## Example Test Template
```typescript
import { test, expect } from '@playwright/test';

test.describe('Feature Name', () => {
  test.beforeEach(async ({ page }) => {
    // Setup
    await page.goto('/');
  });

  test('should perform expected behavior', async ({ page }) => {
    // Arrange
    const loginButton = page.getByRole('button', { name: 'Login' });
    
    // Act
    await loginButton.click();
    
    // Assert
    await expect(page).toHaveURL('/dashboard');
    await expect(page.getByRole('heading', { name: 'Welcome' })).toBeVisible();
  });

  test('should handle error case', async ({ page }) => {
    // Test implementation
  });
});
```

## When Generating Code
- Prioritize readability and maintainability over brevity
- Suggest modern TypeScript features (async/await, optional chaining, nullish coalescing)
- Include proper error handling and edge cases
- Follow Playwright's latest best practices and API recommendations
- Suggest parallel execution when tests are independent
- Recommend accessibility-friendly locators
- Include type definitions for all functions and variables
