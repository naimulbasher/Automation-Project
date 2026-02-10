import { Page } from "@playwright/test";
import { finalpageLocators } from "../locators/finalPageLocators";

export class FinalPage {
  constructor(page) {
    this.page = page;
  }

  async getFinalPageElements() {
    return {
      pageInfo: this.page.locator(finalpageLocators.pageInfo),
      successMsg: this.page.locator(finalpageLocators.successMSg),
      backHomeBtn: this.page.locator(finalpageLocators.backHomeBtn),
    };
  }

  async getSuccessMsgText() {
    const text = this.page.locator(finalpageLocators.successMSg).innerText();
    return (await text).trim();
  }

  async clickOnBackHomeBtn() {
    await this.page.locator(finalpageLocators.backHomeBtn).click();
  }
  async resetAppState() {
    await this.page.click(ProductPageLocators.hamburgerIcon);
    await this.page.click(ProductPageLocators.resetAppState);
    await this.page.click(productPageLocators.logoutLink);
  }
}
