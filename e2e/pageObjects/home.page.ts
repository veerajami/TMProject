import { browser, by, element } from "protractor";
import { FlightBookingDetails } from "../interface/flightBookingDetails";
import { DataUtils } from "../utils/data.utils";
import { WaitUtils } from "../utils/wait.utils";

export class HomePage {
  private signUpBtn = by.css(".sign-up.btn.btn-link");
  private loginBtn = by.css(".login-btn.btn.btn-danger");
  private userHomePageLogo = by.css(".logoTrim");
  private userDetailsBtn = by.css(".pax-name");
  private logoutBtn = by.id("flyout-logOut-link");
  private bookLnk = by.xpath("//a[text()='BOOK']");
  private fromField = by.id("fromAirportName");
  private toField = by.id("toAirportName");
  private searchTxtBx = by.id("search_input");
  private tripTypeDpd = by.id("selectTripType-val");
  private departField = by.css(".calenderDepartSpan");
  private returnField = by.css(".calenderReturnSpan.calendar-placeholder");
  private calendarDoneBtn = by.css(".donebutton");
  private passengersDpd = by.id("passengers-val");
  private shopeWithMilesChkBx = by.id("shopWithMiles");
  private refundableFaresChkBx = by.id("refundableFlightsOnly");
  private myDatesAreaFlexibleChkBx = by.id("chkFlexDate");
  private nearByAirportsChkBx = by.id("nearbyAirports");
  private meetingCodeTxtBx = by.id("meetingCode");
  private faresDpd = by.id("faresFor-val");
  private submitBtn = by.id("btnSubmit");
  private flightStatusLnk = by.xpath("//a[text()='FLIGHT STATUS']");
  private travelInfoLnk = by.xpath("//a[text()='Travel Info']");

  public async clickOnSignUpBtn() {
    await element(this.signUpBtn).click();
  }

  public async clickOnLogin() {
    await element(this.loginBtn).click();
  }

  public async validateHomePage() {
    await WaitUtils.waitUntilElementToBeClickable(
      await element(this.fromField),
      30000
    );
    await expect(await element(this.userHomePageLogo).isDisplayed()).toBe(
      true
    );
  }

  public async isHomePage() {
    await WaitUtils.waitUntilElementToBeClickable(
      await element(this.fromField),
      30000
    );
    return await element(this.userHomePageLogo).isDisplayed();
  }


  public async logout() {
    await this.clickOnUserDetails();
    await this.clickOnLogout();
  }

  public async clickOnUserDetails() {
    await element(this.userDetailsBtn).click();
  }

  public async clickOnLogout() {
    await element(this.logoutBtn).click();
  }

  public async enterFligtDetails(details: FlightBookingDetails) {
    await this.searchAndSelectFrom(details.from);
    await this.searchAndSelectTo(details.to);
    if (details.tripType === "Round Trip") {
      await this.selectDepartDate(details.departureDate);
      await this.selectReturnDate(details.returnDate);
    } else if (details.tripType === "One Way") {
      await this.selectDepartDate(details.departureDate);
    }
    await this.selectPassengers(details.passengers);
    if (
      details.shopWithMiles !== undefined &&
      details.shopWithMiles !== null &&
      details.shopWithMiles !== false
    ) {
      await this.clickShopWithMiles();
    }
    if (
      details.refundableFares !== undefined &&
      details.refundableFares !== null &&
      details.refundableFares !== false
    ) {
      await this.clickRefundableFares();
    }
    if (
      details.myDatesAreFlexible !== undefined &&
      details.myDatesAreFlexible !== null &&
      details.myDatesAreFlexible !== false
    ) {
      await this.clickRefundableFares();
    }
    if (
      details.includeNearByAirports !== undefined &&
      details.includeNearByAirports !== null &&
      details.includeNearByAirports !== false
    ) {
      await this.clickIncludeNearByAirports();
    }
    if (details.meetingCode !== undefined && details.meetingCode !== null) {
      await this.enterMeetingCode(details.meetingCode);
    }
  }

  public async clickOnBook() {
    await element(this.bookLnk).click();
  }

  public async searchAndSelectFrom(name: string) {
    await element(this.fromField).click();
    console.log("clicked on from");
    await element(this.searchTxtBx).sendKeys(name);
    await element(
      by.xpath(
        `//span[contains(@class,'airport-code col') and text()='${name}']/parent::a`
      )
    ).click();
  }

  public async searchAndSelectTo(name: string) {
    await element(this.toField).click();
    await element(this.searchTxtBx).sendKeys(name);
    await element(
      by.xpath(
        `//li[@class='airport-list ng-star-inserted']//span[text()='${name}']`
      )
    ).click();
  }

  public async selectTripType(tripType: string) {
    await element(this.tripTypeDpd).click();
    await element(
      by.xpath(`//ul[@id='selectTripType-desc']/li[text()='${tripType}']`)
    );
  }

  public async selectDepartDate(date: string) {
    await element(this.departField).click();
    await this.selectCalendarDate(date, 1);
    await element(this.calendarDoneBtn).click();
  }

  public async selectReturnDate(date: string) {
    await element(this.returnField).click();
    await this.selectCalendarDate(date, 2);
    await element(this.calendarDoneBtn).click();
  }

  public async selectCalendarDate(date: string, gridNum: number) {
    const vals: string[] = date.split("/");
    while (
      !(
        (await element(
          by.css(`.dl-datepicker-year.dl-datepicker-year-${gridNum - 1}`)
        ).getText()) === vals[2]
      ) ||
      !(
        await element(by.css(`.dl-datepicker-month-${gridNum - 1}`)).getText()
      ).includes(await new DataUtils().getMonthFromDate(date))
    ) {
      await element(by.xpath(`(//span[@class='monthSelector'])[2]`)).click();
    }
    await element(
      by.xpath(
        `((//div[@class='dl-datepicker-calendar-cont'])[${gridNum}]//td[@class='dl-datepicker-available-day'])/a[text()='${vals[0]}']`
      )
    ).click();
  }

  public async selectPassengers(noOfPasgr: string) {
    await element(this.passengersDpd).click();
    await element(
      by.xpath(
        `//ul[@id='passengers-desc']/li[text()="${noOfPasgr} Passenger"]`
      )
    ).click();
  }

  public async clickShopWithMiles() {
    await element(this.shopeWithMilesChkBx).click();
  }

  public async clickRefundableFares() {
    await element(this.refundableFaresChkBx).click();
  }

  public async clickMyDatesAreaFlexible() {
    await element(this.myDatesAreaFlexibleChkBx).click();
  }

  public async clickIncludeNearByAirports() {
    await element(this.nearByAirportsChkBx).click();
  }

  public async selectFares(fares: string) {
    await element(this.faresDpd).click();
    await element(
      by.xpath(`//ul[@id='faresFor-desc']/li[text()='${fares}']`)
    ).click();
  }

  public async enterMeetingCode(code: string) {
    await element(this.meetingCodeTxtBx).sendKeys(code);
  }

  public async clickOnSubmit() {
    await element(this.submitBtn).click();
  }

  public async clickOnFlightStatus() {
    await element(this.flightStatusLnk).click();
  }

  public async clickOnTravelInfoOption(optionName: string) {
    await browser
      .actions()
      .mouseMove(await element(this.travelInfoLnk))
      .perform();
    await browser
      .actions()
      .mouseMove(await element(by.xpath(`//a[text()='${optionName}']`)))
      .click()
      .perform();
  }

  public async getLoggedInUser() {
    return await element(this.userDetailsBtn).getText();
  }
}
