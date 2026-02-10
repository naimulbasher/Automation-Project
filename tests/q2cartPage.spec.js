import { test, expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfigQ2";
import { ProductPage } from "../pages/ProductPage";
import { LoginPage } from "../pages/LoginPage";
import { LoginLocators } from "../locators/LoginLocators";
import { productPageLocators } from "../locators/ProductPageLocators";
import { productsToCart } from "../test-data/products";
import { CartPage } from "../pages/CartPage";

test.describe("Cart Page Validation", () => {
  let loginPage = LoginPage;
  let productPage = ProductPage;
  let cartPage = CartPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);

    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
  });

  test("Validate cart page URL and UI Elements", async ({ page }) => {
    await productPage.addSpecificProductsToCart();
    await productPage.clickOnCartLink();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    const ui = cartPage.getCartPageElements();
    await expect((await ui).cartTile).toBeVisible();
    expect((await ui).checkOut).toBeVisible();
  });
  test("Validate Specfic Products added to the Cart Page", async ({ page }) => {
    const getSpecificProductDetails =
      await productPage.getSpecificProductDetails(productsToCart);
    await productPage.addSpecificProductsToCart(productsToCart);
    await productPage.clickOnCartLink();
    const cartProducts = await cartPage.getCartProducts();
    expect(cartProducts).toEqual(getSpecificProductDetails);
  });
});
