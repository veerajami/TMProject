import { browser } from "protractor";
import { UserProperties } from "../interface/userProperties";
import { HomePage } from "../pageObjects/home.page";
import { LoginPage } from "../pageObjects/login.page";
let homePage: HomePage;
let loginPage: LoginPage;
const userProperties: UserProperties = require(`../../../e2e/data/tempUserProperties.json`);
let originalTimeout: number;


describe("scenario 2", async () => {
  beforeEach(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    await browser.driver.manage().deleteAllCookies();
    await browser.manage().window().maximize();
    await browser.get("https://www.delta.com/apac/en");
    });
    it("Login with newly created user", async () => {
      await browser.waitForAngularEnabled(false);
      homePage = new HomePage();
      await homePage.validateHomePage();
      await homePage.clickOnLogin();
      loginPage = new LoginPage();
      await loginPage.validateLoginPage();
      await loginPage.login(
        userProperties.firstName + userProperties.lastName,
        userProperties.lastName,
        userProperties.password
      );
      await homePage.validateHomePage();
      const loggedInUser: string = await homePage.getLoggedInUser();
      expect(loggedInUser).toEqual(`${userProperties.firstName}`);
      await homePage.clickOnUserDetails();
      await homePage.clickOnLogout();
      await expect(await homePage.isHomePage()).toBe(false);
    });
    afterEach(async () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  });