import { browser } from "protractor";
import { UserProperties } from "../interface/userProperties";
import { BookAFlightPage } from "../pageObjects/bookaflight.page";
import { FirstClassPage } from "../pageObjects/firstclass.page";
import { HomePage } from "../pageObjects/home.page";
import { LoginPage } from "../pageObjects/login.page";
let homePage: HomePage;
let loginPage: LoginPage;
const userProperties: UserProperties = require(`../../../e2e/data/tempUserProperties.json`);
let firstClassPage: FirstClassPage;
let originalTimeout: number;
let bookAFlightPage: BookAFlightPage;

describe("scenario 4", async () => {
  beforeEach(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    await browser.driver.manage().deleteAllCookies();
    await browser.manage().window().maximize();
    await browser.get("https://www.delta.com/apac/en");
    });
    it("Login with newly created user", async () => {
      homePage = new HomePage();
      await browser.waitForAngularEnabled(false);
      await homePage.clickOnLogin();
      loginPage = new LoginPage();
      await loginPage.validateLoginPage();
      await loginPage.login(
        userProperties.firstName + userProperties.lastName,
        userProperties.lastName,
        userProperties.password
      );
      await homePage.validateHomePage();
      await homePage.clickOnTravelInfoOption("First Class");
      firstClassPage = new FirstClassPage();
      await browser.waitForAngularEnabled(false);
      await firstClassPage.clickOnBookNow();
      bookAFlightPage = new BookAFlightPage();
      await expect(await bookAFlightPage.getPageHeader()).toContain("BOOK A FLIGHT");
     },120000);
    afterEach(() => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  });