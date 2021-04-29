import { by, element } from "protractor";
import { WaitUtils } from "../utils/wait.utils";

export class BookAFlightPage {
    private pageHeader = by.css(".advanced-search-heading");

    /**
     * This method validate the BookAFlightPage displayed
     * @author Jami
     * @memberof BookAFlightPage
     */
    public async validateBookAFlightPageHeader() {
        await WaitUtils.waitUntilPresenceOfElement(await element(this.pageHeader));
        await expect(await element(this.pageHeader).getText()).toContain("BOOK A FLIGHT");
    }

    /**
     * This method returns the header text
     * @author Jami
     * @returns
     * @memberof BookAFlightPage
     */
    public async getPageHeader() {
        await WaitUtils.waitUntilPresenceOfElement(await element(this.pageHeader),30000);
        return await element(this.pageHeader).getText();
    }
}