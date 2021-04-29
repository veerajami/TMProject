import { protractor, browser, ElementFinder } from "protractor";

export class WaitUtils {
    public static async waitUntilElementToBeClickable(elmt: ElementFinder, timeInMilliseconds: number = 10000) {
        const EC = protractor.ExpectedConditions;
        await browser.wait(EC.elementToBeClickable(elmt), timeInMilliseconds);
    }

    public static async waitUntilVisibilityOfElement(elmt: ElementFinder, timeInMilliseconds: number = 10000) {
        const EC = protractor.ExpectedConditions;
        await browser.wait(EC.visibilityOf(elmt), timeInMilliseconds);
    }

    public static async waitUntilPresenceOfElement(elmt: ElementFinder, timeInMilliseconds: number = 10000) {
        const EC = protractor.ExpectedConditions;
        await browser.wait(EC.presenceOf(elmt), timeInMilliseconds);
    }
}