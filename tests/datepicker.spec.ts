import { test, expect } from "@playwright/test";

// Use the test.beforeEach hook to run setup code before each test.
test("Date Picker", async ({ page }) => {
  await page.goto("http://localhost:4200/pages/iot-dashboard");
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();
  const calendarInputField = await page.getByPlaceholder("Form Picker");
  await calendarInputField.click();
  //here 30 matches with april 30 as well as May 30 in current view. The difference is class="bounding-month day-cell ng-star-inserted" for the previous month and class="day-cell ng-star-inserted" for the current month
  let date = new Date();
  date.setDate(date.getDate() + 100); //to ensure 28+4 is 1st june and not 32
  const expectedDate = date.getDate().toString(); //getDate returns number so converting to string
  const expectedShortMonth = date.toLocaleString("En-US", { month: "short" });
  const expectedLongMonth = date.toLocaleString("En-US", { month: "long" });
  const expectedYear = date.getFullYear();
  const dateToAssert = `${expectedShortMonth} ${expectedDate}, ${expectedYear}`;

  let calendarMonthAndYear = await page
    .locator("nb-calendar-view-mode")
    .textContent();
  const expectedMonthAndYear = ` ${expectedLongMonth} ${expectedYear}`;
  while (!calendarMonthAndYear?.includes(expectedMonthAndYear)) {
    await page
      .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
      .click();
    calendarMonthAndYear = await page
      .locator("nb-calendar-view-mode")
      .textContent();
  }
  await page
    .locator('[class="day-cell ng-star-inserted"]')
    .getByText(expectedDate, { exact: true }) //if the value is 1 it matches with 1 and 11 to 19 . exact match to avoid this.
    .click();
  expect(calendarInputField).toHaveValue(dateToAssert);
});
