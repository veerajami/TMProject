import { browser, by, element } from "protractor";
import { UserProperties } from "../interface/userProperties";
import { SelectUtils } from "../utils/select.utils";
import { WaitUtils } from "../utils/wait.utils";

export class SignUpPage {
  private sighupPageHeader = by.xpath("//h1[text()='Join SkyMiles']");
  private firstNameTxtBx = by.id("basicInfoFirstName");
  private lastNameTxtBx = by.id("basicInfoLastName");
  private genderDpd = by.id("basicInfoGender-button");
  private dobMonthDpd = by.id("basicInfoMob-button");
  private dobDayDpd = by.id("basicInfoDob-button");
  private dobYearDpd = by.id("basicInfoYob-button");
  private addressTypeDpd = by.id("aType-1-button");
  private addressLine1TxtBx = by.css(".validAddressLine1.input_2.accountStreetAddress.dispBlock");
  private cityTxtBx = by.id("cityCountyWard-1");
  private stateDpd = by.id("stateProv-1-button");
  private zipTxtBx = by.id("postal-1");
  private countryDpd = by.id("countryCode-1-button");
  private countryCodeDpd = by.id("countryCode-1-button");
  private areaCodeTxtBx = by.id("requiredAreacode");
  private phoneTxtBx = by.id("requiredPhoneNumber");
  private emailTxtBx = by.id("basicInfoEmailAddress");
  private confirmEmailTxtBx = by.id("requiredEmail2");
  private userNameTxtBx = by.id("basicInfoUserName");
  private passwordTxtBx = by.id("basicInfoPassword");
  private confirmPasswordTxtBx = by.id("requiredEqualTo");
  private question1Dpd = by.id("basicInfoQuestionId1-button");
  private answer1TxtBx = by.id("basicInfoAnswer1");
  private question2Dpd = by.id("basicInfoQuestionId2-button");
  private answer2TxtBx = by.id("basicInfoAnswer2");
  private languageDpd = by.id("language-button");
  private completeBtn = by.id("next");

  public async createUser(properties: UserProperties) {
    await this.enterFirstName(properties.firstName);
    await this.enterLastName(properties.lastName);
    await this.selectGender(properties.gender);
    await this.selectDOBMonth(properties.dobMonth);
    await this.selectDOBDay(properties.dobDay);
    await this.selectDOBYear(properties.dobYear);
    await this.selectCountry(properties.country);
    await this.selectAddressType(properties.addressType);
    await this.enterAddressLine1(properties.addressLine1);
    await this.enterCity(properties.city);
    await this.selectState(properties.state);
    await this.enterZip(properties.zip);
    await this.enterAreaCode(properties.areaCode);
    await this.enterPhone(properties.phone);
    await this.enterEmail(properties.email);
    await this.enterConfirmationEmail(properties.email);
    await this.enterUserName(properties.userName);
    await this.enterPassword(properties.password);
    await this.enterConfirmPassword(properties.password);
    await this.selectQuestion1(properties.question1);
    await this.enterAnswer1(properties.answer1);
    await this.selectQuestion2(properties.question2);
    await this.enterAnswer2(properties.answer2);
    await this.clickOnComplete();
  }

  public async validateSignupPage() {
    await WaitUtils.waitUntilElementToBeClickable(await element(this.firstNameTxtBx), 30000);
    await expect(await element(this.sighupPageHeader).isDisplayed()).toBe(true);
  }

  public async enterFirstName(name: string) {
    await element(this.firstNameTxtBx).sendKeys(name);
  }

  public async enterLastName(name: string) {
    await element(this.lastNameTxtBx).sendKeys(name);
  }

  public async selectGender(gender: string) {
    await SelectUtils.selectListDropDown(await element(this.genderDpd), gender);
  }

   public async selectDOBMonth(month: string) {
    await SelectUtils.selectListDropDown(await element(this.dobMonthDpd), month);
  }

  public async selectDOBDay(day: string) {
    await SelectUtils.selectListDropDown(await element(this.dobDayDpd), day);
  }

  public async selectDOBYear(year: string) {
    await SelectUtils.selectListDropDown(await element(this.dobYearDpd), year);
  }

  public async selectCountry(country: string) {
    await SelectUtils.selectListDropDown(await element(this.countryDpd), country);
  }
  public async selectAddressType(type: string) {
    await SelectUtils.selectListDropDown(await element(this.addressTypeDpd), type);
  }

  public async enterAddressLine1(address1: string) {
    await element(this.addressLine1TxtBx).sendKeys(address1);
  }

  public async enterCity(city: string) {
    await element(this.cityTxtBx).sendKeys(city);
  }

  public async selectState(state: string) {
    await SelectUtils.selectListDropDown(await element(this.stateDpd), state);
  }
  public async enterZip(zip: string) {
    await element(this.zipTxtBx).sendKeys(zip);
  }

  public async selectCountryCode(code: string) {
    await SelectUtils.selectListDropDown(await element(this.countryCodeDpd), code);
  }

  public async enterAreaCode(code: string) {
    await element(this.areaCodeTxtBx).sendKeys(code);
  }

  public async enterPhone(phone: string) {
    await element(this.phoneTxtBx).sendKeys(phone);
  }

  public async enterEmail(email: string) {
    await element(this.emailTxtBx).sendKeys(email);
  }

  public async enterConfirmationEmail(email: string) {
    await element(this.confirmEmailTxtBx).sendKeys(email);
  }

  public async enterUserName(userName: string) {
    await element(this.userNameTxtBx).sendKeys(userName);
  }

  public async enterPassword(passowrd: string) {
    await element(this.passwordTxtBx).sendKeys(passowrd);
  }

  public async enterConfirmPassword(passowrd: string) {
    await element(this.confirmPasswordTxtBx).sendKeys(passowrd);
  }

  public async selectQuestion1(question: string) {
    await SelectUtils.selectListDropDown(await element(this.question1Dpd), question);
  }

  public async enterAnswer1(answer: string) {
    await element(this.answer1TxtBx).sendKeys(answer);
  }

  public async selectQuestion2(question: string) {
    await SelectUtils.selectListDropDown(element(this.question2Dpd), question, "basicInfoQuestionId2-menu");
  }

  public async enterAnswer2(answer: string) {
    await element(this.answer2TxtBx).sendKeys(answer);
  }

  public async selectLanguage(language: string) {
    await SelectUtils.selectListDropDown(await element(this.languageDpd), language);
  }

  public async clickOnComplete() {
    await browser.sleep(2000);
    await element(this.completeBtn).click();
    await browser.waitForAngularEnabled(true);
  }
}
