import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage'
import { ProductPage } from '../pages/ProductPage'
import { BASE_URL, USERNAME, PASSWORD } from '../utils/envConfigQ2'
import { productsToCart } from '../test-data/products'
import { cartPage } from '../pages/CartPage'


test.describe("Product Page Validation", () => {
  let loginPage = LoginPage;
  let productPage = ProductPage;

  test.beforeEach("login with standard_user", async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);

    await page.goto(BASE_URL);
    await page.waitForTimeout(5000);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await page.waitForTimeout(5000);
  });
  test("Reset App State validation", async ({ page }) => {
    await page.waitForTimeout(5000);
    await productPage.resetAppState;
  });
  test("Validate adding specific products to cart", async ({ page }) => {
    await productPage.addSpecificProductsToCart(productsToCart);
  });
});
