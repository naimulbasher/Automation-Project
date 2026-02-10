import { test, expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfigQ2";
import { ProductPage } from "../pages/ProductPage";
import { LoginPage } from "../pages/LoginPage";
import { LoginLocators } from "../locators/LoginLocators";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { checkoutData } from "../test-data/checkoutData";

test.describe("Cart Page Validation", () => {
  let loginPage = LoginPage;
  let productPage = ProductPage;
  let cartPage = CartPage;
  let checkoutPage = CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await productPage.addSpecificProductsToCart();
    await productPage.clickOnCartLink();
  });

  test("Validate Checkout Page UI Elements and url", async ({ page }) => {
    await cartPage.clickCheckoutButton();
    await expect(page).toHaveURL(
      "https://www.saucedemo.com/checkout-step-one.html",
    );
    const elements = await checkoutPage.getCheckoutElements();
    await expect(elements.pageInfo).toBeVisible();
    await expect(elements.continue).toBeVisible();
  });
  test("Validate continue Button", async ({ page }) => {
    await cartPage.clickCheckoutButton();
    await checkoutPage.fillCheckoutDetail(
      checkoutData.firstName,
      checkoutData.lastName,
      checkoutData.postalCode,
    );
    await checkoutPage.clickOnContinue();
  });
});
