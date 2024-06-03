import { Page, expect } from "@playwright/test";

import { NavigationPage } from "../page-objects/navigationPage";
import { FormLayoutsPage } from "../page-objects/formLayoutsPage";
import { DatepickerPage } from "../page-objects/datePickerPage";

export class PageManager {
  private readonly page: Page;
  private readonly navigationPage: NavigationPage;
  private readonly formLayoutPage: FormLayoutsPage;
  private readonly datePickerPage: DatepickerPage;
  constructor(page: Page) {
    this.page = page;
    this.navigationPage = new NavigationPage(this.page); //this.page should be passed
    this.formLayoutPage = new FormLayoutsPage(this.page);
    this.datePickerPage = new DatepickerPage(this.page);
  }

  get navigateTo() {
    return this.navigationPage;
  }

  get onFormLayoutsPage() {
    return this.formLayoutPage;
  }
  get onDatePickerPage() {
    return this.datePickerPage;
  }
}
