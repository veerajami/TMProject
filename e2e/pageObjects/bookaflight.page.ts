import { by, element } from "protractor";
import { WaitUtils } from "../utils/wait.utils";

export class BookAFlightPage {
    private pageHeader = by.css(".advanced-search-heading");

    public async validateBookAFlightPageHeader() {
        await WaitUtils.waitUntilPresenceOfElement(await element(this.pageHeader));
        await expect(await element(this.pageHeader).getText()).toContain("BOOK A FLIGHT");
    }

    public async getPageHeader() {
        await WaitUtils.waitUntilPresenceOfElement(await element(this.pageHeader),30000);
        return await element(this.pageHeader).getText();
    }
}