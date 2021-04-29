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

  /**
   * This method performs click operation on singup button
   * @author Jami
   * @memberof HomePage
   */
  public async clickOnSignUpBtn() {
    await element(this.signUpBtn).click();
  }

  /**
   * This method performs click operation on login button
   * @author Jami
   * @memberof HomePage
   */
  public async clickOnLogin() {
    await element(this.loginBtn).click();
  }

  /**
   * This method validates the HomePage displayed
   * @author Jami
   * @memberof HomePage
   */
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


  /**
   * This method performes logout operation
   * @author Jami
   * @memberof HomePage
   */
  public async logout() {
    await this.clickOnUserDetails();
    await this.clickOnLogout();
  }

  /**
   * This method performs click on user details link
   * @author Jami
   * @memberof HomePage
   */
  public async clickOnUserDetails() {
    await element(this.userDetailsBtn).click();
  }

  /**
   * This method performs click operation on logout button
   * @author Jami
   * @memberof HomePage
   */
  public async clickOnLogout() {
    await element(this.logoutBtn).click();
  }

  /**
   * This method adds the given data to fligh booking fields
   * @author Jami
   * @param {FlightBookingDetails} details
   * @memberof HomePage
   */
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

  /**
   * This method performs click operation on book link
   * @author Jami
   * @memberof HomePage
   */
  public async clickOnBook() {
    await element(this.bookLnk).click();
  }

  /**
   * This method select the name on FROM field
   * @author Jami
   * @param {string} name
   * @memberof HomePage
   */
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

  /**
   * This method select the name on TO field
   * @author Jami
   * @param {string} name
   * @memberof HomePage
   */
  public async searchAndSelectTo(name: string) {
    await element(this.toField).click();
    await element(this.searchTxtBx).sendKeys(name);
    await element(
      by.xpath(
        `//li[@class='airport-list ng-star-inserted']//span[text()='${name}']`
      )
    ).click();
  }

  /**
   * This method select the Trip Type
   * @author Jami
   * @param {string} tripType
   * @memberof HomePage
   */
  public async selectTripType(tripType: string) {
    await element(this.tripTypeDpd).click();
    await element(
      by.xpath(`//ul[@id='selectTripType-desc']/li[text()='${tripType}']`)
    );
  }

  /**
   * This method select DepartDate
   * @author Jami
   * @param {string} date
   * @memberof HomePage
   */
  public async selectDepartDate(date: string) {
    await element(this.departField).click();
    await this.selectCalendarDate(date, 1);
    await element(this.calendarDoneBtn).click();
  }

  /**
   * This method selects the Return Date
   * @author Jami
   * @param {string} date
   * @memberof HomePage
   */
  public async selectReturnDate(date: string) {
    await element(this.returnField).click();
    await this.selectCalendarDate(date, 2);
    await element(this.calendarDoneBtn).click();
  }

  /**
   * This method selects date from Calendar field
   * @author Jami
   * @param {string} date
   * @param {number} gridNum
   * @memberof HomePage
   */
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

  /**
   * This method selects the number of passengers from passengers field
   * @author Jami
   * @param {string} noOfPasgr
   * @memberof HomePage
   */
  public async selectPassengers(noOfPasgr: string) {
    await element(this.passengersDpd).click();
    await element(
      by.xpath(
        `//ul[@id='passengers-desc']/li[text()="${noOfPasgr} Passenger"]`
      )
    ).click();
  }

  /**
   * This method performs click operation on Shope With Miles link
   * @author Jami
   * @memberof HomePage
   */
  public async clickShopWithMiles() {
    await element(this.shopeWithMilesChkBx).click();
  }

  /**
   * This method performs click operation on Refundable Fares checkbox
   * @author Jami
   * @memberof HomePage
   */
  public async clickRefundableFares() {
    await element(this.refundableFaresChkBx).click();
  }

  /**
   * This method performs click operation on My Dates Area Flexible checkbox
   * @author Jami
   * @memberof HomePage
   */
  public async clickMyDatesAreaFlexible() {
    await element(this.myDatesAreaFlexibleChkBx).click();
  }

  /**
   * This method performs click operation on Include Near By Airports checkbox
   * @author Jami
   * @memberof HomePage
   */
  public async clickIncludeNearByAirports() {
    await element(this.nearByAirportsChkBx).click();
  }

  /**
   * This method selects the Fares drop down
   * @author Jami
   * @param {string} fares
   * @memberof HomePage
   */
  public async selectFares(fares: string) {
    await element(this.faresDpd).click();
    await element(
      by.xpath(`//ul[@id='faresFor-desc']/li[text()='${fares}']`)
    ).click();
  }

  /**
   * This method the enters the given text under Meeting Code textbox
   * @author Jami
   * @param {string} code
   * @memberof HomePage
   */
  public async enterMeetingCode(code: string) {
    await element(this.meetingCodeTxtBx).sendKeys(code);
  }

  /**
   * THis method performs click operation on submit button
   * @author Jami
   * @memberof HomePage
   */
  public async clickOnSubmit() {
    await element(this.submitBtn).click();
  }

  /**
   * THis method performs click operation on Fight Status link
   * @author Jami
   * @memberof HomePage
   */
  public async clickOnFlightStatus() {
    await element(this.flightStatusLnk).click();
  }

  /*
   * THis method performs click operation on Travel Info Option
   *
   * @param {string} optionName
   * @memberof HomePage
   */
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

  /**
   * This method fetches the current logged in user name
   * @author Jami
   * @returns
   * @memberof HomePage
   */
  public async getLoggedInUser() {
    return await element(this.userDetailsBtn).getText();
  }
}
