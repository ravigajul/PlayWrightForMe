import { test, expect } from "@playwright/test";
import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datePickerPage";
import { PageManager } from "../page-objects/pageManager";

//global variables
let navigateTo: NavigationPage;
let onFormLayoutsPage: FormLayoutsPage;
let datePickerPage: DatepickerPage;
let pageManager: PageManager;

//before each method
test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200");
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
  await pageManager.onFormLayoutsPage.submitUsingTheGridFormWithCredentialsAndSelectOption(
    "Ravi.Gajul@test.com",
    "Testing!123",
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
    "Ravi",
    "test@test.com",
    true
  );
});

test("Select dates from common and range Date pickers", async ({ page }) => {
  await pageManager.navigateTo.datePickerPage();
  await pageManager.onDatePickerPage.selectCommonDatePickerDateFromToday(200);
  await pageManager.onDatePickerPage.selectDatePickerWithRangeFromToday(15, 20);
});
