import { Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class DatepickerPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }
  async selectCommonDatePickerDateFromToday(numberOfDaysFromToday: number) {
    const calendarInputField = this.page.getByPlaceholder("Form Picker");
    await calendarInputField.click();
    const dateToAssert = await this.selectDateFromCalendar(
      numberOfDaysFromToday
    );
    expect(calendarInputField).toHaveValue(dateToAssert);
  }

  async selectDatePickerWithRangeFromToday(
    startDateFromToday: number,
    endDateFromToday: number
  ) {
    const calendarInputField = this.page.getByPlaceholder("Range Picker");
    await calendarInputField.click();
    const dateToAssertStart = await this.selectDateFromCalendar(
      startDateFromToday
    );
    const dateToassertEnd = await this.selectDateFromCalendar(endDateFromToday);
    const dateToAssert = `${dateToAssertStart} - ${dateToassertEnd}`;
    await expect(calendarInputField).toHaveValue(dateToAssert);
  }

  private async selectDateFromCalendar(numberOfDaysFromToday: number) {
    //here 30 matches with april 30 as well as May 30 in current view. The difference is class="bounding-month day-cell ng-star-inserted" for the previous month and class="day-cell ng-star-inserted" for the current month
    let date = new Date();
    date.setDate(date.getDate() + numberOfDaysFromToday); //to ensure 28+4 is 1st june and not 32
    const expectedDate = date.getDate().toString(); //getDate returns number so converting to string
    const expectedShortMonth = date.toLocaleString("En-US", { month: "short" });
    const expectedLongMonth = date.toLocaleString("En-US", { month: "long" });
    const expectedYear = date.getFullYear();
    const dateToAssert = `${expectedShortMonth} ${expectedDate}, ${expectedYear}`;

    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();
    const expectedMonthAndYear = ` ${expectedLongMonth} ${expectedYear}`;
    while (!calendarMonthAndYear?.includes(expectedMonthAndYear)) {
      await this.page
        .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();
      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    } //if the value is 1 it matches with 1 and 11 to 19 . exact match to avoid this..click();
    await this.page
      .locator(".day-cell.ng-star-inserted")
      .getByText(expectedDate, { exact: true })
      .click();
    return dateToAssert;
  }
}
