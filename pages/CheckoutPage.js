import { CheckoutPageLocators } from "../locators/checkoutPageLocators";
import { Page } from "@playwright/test";

export class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async getCheckoutElements() {
    return {
      pageInfo: this.page.locator(CheckoutPageLocators.pageInfo),
      continue: this.page.locator(CheckoutPageLocators.continueButton),
    };
  }

  async fillCheckoutDetail(firstName, lastName, postalCode) {
    await this.page.fill(CheckoutPageLocators.firstName, firstName);
    await this.page.fill(CheckoutPageLocators.lastName, lastName);
    await this.page.fill(CheckoutPageLocators.postalCode, postalCode);
  }
  async clickOnContinue() {
    await this.page.click(CheckoutPageLocators.continueButton);
  }
}
