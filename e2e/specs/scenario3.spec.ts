import { browser } from "protractor";
import { FlightBookingDetails } from "../interface/flightBookingDetails";
import { UserProperties } from "../interface/userProperties";
import { HomePage } from "../pageObjects/home.page";
import { LoginPage } from "../pageObjects/login.page";
let homePage: HomePage;
let loginPage: LoginPage;
const userProperties: UserProperties = require(`../../../e2e/data/tempUserProperties.json`);
let flightBookingDetails: FlightBookingDetails;
let originalTimeout: number;

describe("scenario 3", async () => {
  beforeEach(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    await browser.driver.manage().deleteAllCookies();
    await browser.manage().window().maximize();
    await browser.get("https://www.delta.com/apac/en");
    });
    it("Book flight with newly created user", async () => {
      homePage = new HomePage();
      await browser.waitForAngularEnabled(false);
      await homePage.clickOnLogin();
      loginPage = new LoginPage();
      await loginPage.login(
        userProperties.firstName + userProperties.lastName,
        userProperties.lastName,
        userProperties.password
      );
      await browser.sleep(5000);
      // await browser.waitForAngularEnabled(true);
      flightBookingDetails = {
        from: "HYD",
        to: "MAA",
        tripType: "Round Trip",
        departureDate: "28/7/2021",
        returnDate: "21/8/2021",
        passengers: "1",
        shopWithMiles: false,
        refundableFares: false,
        myDatesAreFlexible: false,
        includeNearByAirports: false,
        fares: "Basic Economy",
        meetingCode: "2345",
      };
      await homePage.clickOnBook();
      await homePage.enterFligtDetails(flightBookingDetails);
      await homePage.logout();
      await expect(await homePage.isHomePage()).toBe(true);
    });

    afterEach(async () => {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
  });