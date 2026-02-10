import { Page } from "@playwright/test";
import { cartPagelocators } from "../locators/cartPageLocators";

export class CartPage {
  constructor(page) {
    this.page = page;
    }


    async getCartPageElements() {
        return {
            cartTile: this.page.locator(cartPagelocators.cartTile),
            checkOut: this.page.locator(cartPagelocators.checkOutButton)
        }
    }

    async getCartProducts() {
        const allNames = await this.page.locator(cartPagelocators.productNames).allTextContents();
        const allPrices = await this.page.locator(cartPagelocators.productPrices).allTextContents();

        const allCartProducts = allNames.map((_, i) =>
        ({
            name: allNames[i].trim(),
            price: allPrices[i].trim()

        }))
        return allCartProducts;
    }
    async clickCheckoutButton() {
        await this.page.locator(cartPagelocators.checkOutButton).click();
    }
}



