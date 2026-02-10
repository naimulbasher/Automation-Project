import { Page } from '@playwright/test'
import { checkoutOverviewLocators } from '../locators/checkoutOverviewLocators'

export class CheckoutOverviewPage {
    constructor(page) {
        this.page = page;
    }

    async getCheckoutOverviewElements() {
        return {
            pageInfo: this.page.locator(checkoutOverviewLocators.pageInfo),
            finishButton: this.page.locator(checkoutOverviewLocators.finishButton),
        }
    }

    async getOverviewProducts() {
        const allNames = await this.page.locator(checkoutOverviewLocators.productNames).allTextContents();
        const allPrices = await this.page.locator(checkoutOverviewLocators.productPrices).allTextContents();

        const allCartProducts = allNames.map((_, i) =>
        ({
            name: allNames[i].trim(),
            price: allPrices[i].trim()

        }))
        return allCartProducts;
    }

    async getItemTotal() {
        const text = await this.page.locator(checkoutOverviewLocators.itemTotal).textContent();
        if (!text) {
        throw new Error("Item total not found");
    }
        return parseFloat(text.replace("Item total: $", "").trim());
        
    }
    async getTax() {
        const text = await this.page.locator(checkoutOverviewLocators.tax).textContent();
        if (!text) {
        throw new Error("Tax not found");
    }
    return parseFloat(text.replace("Tax: $", "").trim());
    }

    async getTotal() {
        const text = await this.page.locator(checkoutOverviewLocators.total).textContent();
        if (!text) {
          throw new Error("Total not found");
        }
        return parseFloat(text.replace("Total: $", "").trim());
    }

    async clickOnFinish() {
        await this.page.locator(checkoutOverviewLocators.finishButton).click();
    }
}