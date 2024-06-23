import { DatepickerPage } from "../page-objects/datePickerPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { NavigationPage } from "../page-objects/navigationPage";
import { PageManager } from "../page-objects/pageManager";
import { test } from '../test-options';
//global variables
let navigateTo: NavigationPage;
let onFormLayoutsPage: FormLayoutsPage;
let datePickerPage: DatepickerPage;
let pageManager: PageManager;

test("Select dates from common and range Date pickers without pagemanger fixture", async ({ page ,formLayoutsPage}) => {
  pageManager = new PageManager(page);
  await pageManager.navigateTo.datePickerPage();
  await pageManager.onDatePickerPage.selectCommonDatePickerDateFromToday(200);
  await pageManager.onDatePickerPage.selectDatePickerWithRangeFromToday(15, 20);
});

test("Select dates from common and range Date pickers with page manager fixture", async ({pageManager}) => {
    await pageManager.navigateTo.datePickerPage();
    await pageManager.onDatePickerPage.selectCommonDatePickerDateFromToday(200);
    await pageManager.onDatePickerPage.selectDatePickerWithRangeFromToday(15, 20);
  });
