import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datePickerPage";
import { PageManager } from "../page-objects/pageManager";
import { faker } from "@faker-js/faker";
//global variables
let navigateTo: NavigationPage;
let onFormLayoutsPage: FormLayoutsPage;
let datePickerPage: DatepickerPage;
let pageManager: PageManager;

//before each method
test.beforeEach(async ({ page }) => {
  //base url is in playwright.config.ts under use key
  await page.goto("/");
  pageManager = new PageManager(page);
  await pageManager.navigateTo.formLayoutsPage();
});

test("Navigate to form Page", async ({ page }) => {
  await pageManager.navigateTo.smartTablePage();
  await pageManager.navigateTo.datePickerPage();
  await pageManager.navigateTo.toastrPage();
  await pageManager.navigateTo.toolTipPage();
});

test("Parameterized Methods", async ({ page }) => {
  const firstName = faker.person.fullName();
  const randomEmail = `${faker.person.firstName()}.${faker.person.lastName()}@test.com`;
  const radndomPassword = `${faker.color}!123`;
  await pageManager.onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
    randomEmail,
    radndomPassword,
    "Option 1"
  );
});

test("Parameterized Methods different Credentials", async ({ page }) => {
  await pageManager.onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
    "Gajul@test.com",
    "Test@123",
    "Option 2"
  );
});

test("Submit inline form", async ({ page }) => {
  await pageManager.onFormLayoutsPage.submitInlineFormWithNameEmailAndCheckBox(
    process.env.NAME!,
    process.env.EMAIL!,
    true
  );
});

test("Select dates from common and range Date pickers", async ({ page }) => {
  await pageManager.navigateTo.datePickerPage();
  await pageManager.onDatePickerPage.selectCommonDatePickerDateFromToday(200);
  await pageManager.onDatePickerPage.selectDatePickerWithRangeFromToday(15, 20);
});
