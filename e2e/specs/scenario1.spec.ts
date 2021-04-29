import { browser } from "protractor";
import { UserProperties } from "../interface/userProperties";
import { HomePage } from "../pageObjects/home.page";
import { SignUpPage } from "../pageObjects/signup.page";
import { DataUtils } from "../utils/data.utils";
import { writeFileSync } from "fs"
import { WelcomePage } from "../pageObjects/welcome.page";
let homePage: HomePage;
let signUpPage: SignUpPage;
let originalTimeout: number;

let welcomePage: WelcomePage;

describe("scenario 1", async () => {
  beforeEach(async () => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 60000;
    await browser.driver.manage().deleteAllCookies();
    await browser.manage().window().maximize();
    await browser.get("https://www.delta.com/apac/en");
    });
  it("create user and validate user created", async () => {
    homePage = new HomePage();
    await homePage.validateHomePage();
    await homePage.clickOnSignUpBtn();
    await browser.waitForAngularEnabled(false);
    signUpPage = new SignUpPage();
    await signUpPage.validateSignupPage();
    const firstName = await DataUtils.getRandomText();
    const lastName = await DataUtils.getRandomText();
    const fullName =  firstName + lastName;
    const userProperties: UserProperties = {
      firstName,
      lastName,
      gender: "Male",
      dobMonth: "January",
      dobDay: "27",
      dobYear: "1991",
      addressType: "Home",
      addressLine1: "chennai central",
      city: "chennai",
      state: "Tamil Nadu",
      zip: "600119",
      country: "India",
      areaCode: "91",
      phone: "8529637415",
      email: fullName + "@gmail.com",
      userName: fullName,
      password: "Delta$2021",
      question1: "What is the name of the first school you attended?",
      answer1: "school",
      question2: "What is the name of your first pet?",
      answer2: "first pet",
    };
    writeFileSync("./e2e/data/tempUserProperties.json", JSON.stringify(userProperties));
    await browser.waitForAngularEnabled(true);
    await signUpPage.createUser(userProperties);
    welcomePage = new WelcomePage();
    await expect(await welcomePage.getWelcomeText()).toContain(`${userProperties.firstName}`);
  },120000);

  afterEach(async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
});
});

