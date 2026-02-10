import { test, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import { BASE_URL, USERNAME, PASSWORD } from "../utils/envConfigQ1";

test("login with locked_out_user and verify the error message", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await page.goto(BASE_URL);
  await page.waitForTimeout(5000);
  await loginPage.login(USERNAME, PASSWORD);
  const error = await loginPage.getErrorMessage();
  expect(error?.trim()).toEqual(
    "Epic sadface: Sorry, this user has been locked out.",
  );
});
