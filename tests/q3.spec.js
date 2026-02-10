import { test, expect } from "@playwright/test";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfigQ3";
import { LoginPage } from "../pages/LoginPage";
import { ProductPage } from "../pages/ProductPage";
import { LoginLocators } from "../locators/LoginLocators";
import { productPageLocators } from "../locators/ProductPageLocators";
import { checkoutOverviewLocators } from "../locators/checkoutOverviewLocators";
import { CartPage } from "../pages/CartPage";
import { TaskThree } from "../pages/TaskThree";
import { CheckoutPage } from "../pages/CheckoutPage";
import { checkoutData } from "../test-data/checkoutData";
import { CheckoutOverviewPage } from "../pages/CheckoutOverviewPage";

test.describe("Q3 Task", () => {
  let loginPage = LoginPage;
  let productPage = ProductPage;
  let cartPage = CartPage;
  let checkoutPage = CheckoutPage;
  let taskThree = TaskThree;
  let checkoutOverviewPage = CheckoutOverviewPage;

  test.beforeEach("login with performance_glitch_user", async ({ page }) => {
    loginPage = new LoginPage(page);
    productPage = new ProductPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    taskThree = new TaskThree(page);

    await page.goto(BASE_URL);
    await loginPage.login(USERNAME, PASSWORD);
    await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
    await productPage.addFirstProductToCart();
    await productPage.clickOnCartLink();
  });
  test("Filter By Name Z to A", async () => {
    await productPage.filterByNameZtoA();
    const names = await taskThree.getProductNames();
    const sorted = [...names].sort().reverse();
    expect(names).toEqual(sorted);
  });
  test("Reset App State validation", async ({ page }) => {
    await taskThree.resetAppState();
  });
  test("Validate Product Page", async ({ page }) => {
    await productPage.addFirstProductToCart();
    await productPage.addAllProductsToCart();
  });
  test("Validate cart page URL and UI Elements", async ({ page }) => {
    await taskThree.clickOnCartLink();
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");
    const ui = taskThree.getCartPageElements();
    await expect((await ui).cartTile).toBeVisible();
    expect((await ui).checkOut);
  });
  test("Validate First Product in the Cart Page", async ({ page }) => {
    const firstProduct = await taskThree.getFirstProductDetails();
    const cartProducts = await taskThree.getCartProducts();
    expect(cartProducts[0]).toEqual(firstProduct);
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
