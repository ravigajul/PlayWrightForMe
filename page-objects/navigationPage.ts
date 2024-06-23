import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class NavigationPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  
  async formLayoutsPage() {
    await this.selectGroupMenuItem("Forms");
    await this.page.getByText("Form Layouts").click();
  }

  async datePickerPage() {
    await this.selectGroupMenuItem("Forms");
    await this.page.getByText("Datepicker").click();
  }

  async smartTablePage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.page.getByText("Smart Table").click();
  }

  async toastrPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Toastr").click();
  }

  async toolTipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Tooltip").click();
  }
  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");
    if (expandedState == "false") {
      //not a boolean but a string value true or false for the attribute aria-label.
      await groupMenuItem.click();
    }
  }
}
