import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class FormLayoutsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   *
   * @param email - Valid email id of the user
   * @param password - password of the user
   * @param optionText - label of the radio button to be selected
   */
  async submitUsingTheGridFormWithCredentialsAndSelectOption(
    email: string,
    password: string,
    optionText: string
  ) {
    await this.page.locator("#inputEmail1").fill(email);
    await this.page.locator("#inputPassword2").fill(password);
    await this.page
      .locator("label")
      .filter({ hasText: optionText })
      .check({ force: true });
    await this.page
      .locator("nb-card")
      .filter({ hasText: "Using the" })
      .getByRole("button")
      .click();
  }

  /**
   *
   * @param name --should be first name and last name
   * @param email -- valid email for the test user
   * @param rememberMe -- true or false
   */
  async submitInlineFormWithNameEmailAndCheckBox(
    name: string,
    email: string,
    rememberMe: boolean
  ) {
    await this.page.getByPlaceholder("Jane Doe").fill(name);
    await this.page
      .locator("form")
      .filter({ hasText: "Remember meSubmit" })
      .getByPlaceholder("Email")
      .fill(email);
    if (rememberMe) {
      await this.page
        .locator("form")
        .filter({ hasText: "Remember meSubmit" })
        .locator("span")
        .first()
        .click();
    }
    await this.page
      .locator("form")
      .filter({ hasText: "Remember meSubmit" })
      .getByRole("button")
      .click();
  }
}
