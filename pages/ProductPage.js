import { ProductPageLocators } from "../locators/ProductPageLocators";
import { page } from "@playwright/test";

export class ProductPage {
  constructor(page) {
    this.page = page;
  }

  async resetAppState() {
    await this.page.click(ProductPageLocators.hamburgerIcon);
    await page.waitForTimeout(5000);
    await this.page.click(ProductPageLocators.resetAppState);
    await this.page.click(ProductPageLocators.crossButton);
  }
  async addSpecificProductsToCart(productName = []) {
    const addProducts = this.page.locator(ProductPageLocators.productNames);
    const count = await addProducts.count();
    for (let i = 0; i < count; i++) {
      const name = await addProducts.nth(i).textContent();
      if (name && productName.includes(name.trim())) {
        await this.page
          .locator(ProductPageLocators.addToCartButtons)
          .nth(i)
          .click();
        await this.page.waitForTimeout(3000);
      }
    }
  }
  async addFirstProductToCart() {
    await this.page
      .locator(ProductPageLocators.addToCartButtons)
      .first()
  }
  async addAllProductsToCart() {
    const buttons = this.page.locator(ProductPageLocators.addToCartButtons);
    const count = await buttons.count();

    for (let i = 0; i < count; i++) {
      await buttons.nth(i).click();
      await this.page.waitForTimeout(1000);
    }
  }
  async validateAllProductsDisplayed() {
    const names = await this.page
      .locator(ProductPageLocators.productNames)
      .allTextContents();
    const descriptions = await this.page
      .locator(ProductPageLocators.productDescription)
      .allTextContents();
    const price = await this.page
      .locator(ProductPageLocators.productPrices)
      .allTextContents();
    const buttonCount = await this.page
      .locator(ProductPageLocators.addToCartButtons)
      .count();

    if (names.length === 0) throw new Error("No products found");

    if (
      names.length !== descriptions.length ||
      names.length !== price.length ||
      names.length !== buttonCount
    )
      throw new Error("Mismatch between the product Details");
  }
  async filterByNameZtoA() {
    await this.page.locator(ProductPageLocators.filterDropdown, "za");
    await this.page.waitForTimeout(3000);
  }
  async clickOnCartLink() {
    await this.page.locator(ProductPageLocators.cartLink).click();
  }
  async getSpecificProductDetails(productName = []) {
    const allNames = await this.page
      .locator(ProductPageLocators.productNames)
      .allTextContents();
    const allPrices = await this.page
      .locator(ProductPageLocators.productPrices)
      .allTextContents();

    const allProducts = allNames.map((_, i) => ({
      name: allNames[i].trim(),
      price: allPrices[i].trim(),
    }));
    return allProducts.filter((p) => productName.includes(p.name));
  }
}
