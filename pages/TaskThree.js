import { ProductPageLocators } from "../locators/ProductPageLocators";
import { cartPagelocators } from "../locators/cartPageLocators";
import { checkoutOverviewLocators } from "../locators/checkoutOverviewLocators";
import { CheckoutPageLocators } from "../locators/checkoutPageLocators";
import { page } from "@playwright/test";

export class TaskThree {
  constructor(page) {
    this.page = page;
  }
  //step-1: Reset app state
  async resetAppState() {
    await this.page.click(ProductPageLocators.hamburgerIcon);
    await this.page.click(ProductPageLocators.resetAppState);
    await this.page.click(ProductPageLocators.crossButton);
  }
  //Step-3: Product name,price & click cart
  async getProductNames() {
    return await this.page
      .locator(ProductPageLocators.productNames)
      .allTextContents();
  }
  async getProductPrices() {
    const prices = await this.page
      .locator(ProductPageLocators.productPrices)
      .allTextContents();
    return prices.map((price) => parseFloat(price.replace("$", "")));
  }
  async clickOnCartLink() {
    await this.page.locator(ProductPageLocators.cartLink).click();
  }

  //step-4: All product details
  async getAllProductDetails() {
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
    return allProducts;
  }
  //step-7: First added product details
  async getFirstProductDetails() {
    const name = await this.page
      .locator(ProductPageLocators.productNames)
      .first()
      .textContent();
    const price = await this.page
      .locator(ProductPageLocators.productPrices)
      .first()
      .textContent();

    return {
      name: name?.trim(),
      price: price?.trim(),
    };
  }
  //step-8: Click on cart
  async clickOnCartLink() {
    await this.page.locator(ProductPageLocators.cartLink).click();
  }
  async getCartPageElements() {
    return {
      cartTile: this.page.locator(cartPagelocators.cartTile),
      productNames: this.page.locator(cartPagelocators.productNames),
      productPrices: this.page.locator(cartPagelocators.productPrices),
      checkOutButton: this.page.locator(cartPagelocators.checkOutButton),
    };
  }
  async getCartProducts() {
    const allNames = await this.page
      .locator(cartPagelocators.productNames)
      .allTextContents();
    const allPrices = await this.page
      .locator(cartPagelocators.productPrices)
      .allTextContents();

    const allProducts = allNames.map((_, i) => ({
      name: allNames[i].trim(),
      price: allPrices[i].trim(),
    }));
    return allProducts;
  }
}
