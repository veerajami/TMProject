import { browser, by, element, ElementFinder, protractor } from "protractor";
import { highlightByJSExec } from "./common.utils";

export class SelectUtils {
  // tslint:disable-next-line:no-unnecessary-initializer
  public static async selectListDropDown(elmt: ElementFinder, value: string, id: string = undefined) {
    const EC = protractor.ExpectedConditions;
    await browser.wait(EC.elementToBeClickable(elmt), 10000);
    await elmt.click();
    let option: ElementFinder;
    if (id !== undefined) {
      option = element(by.xpath(`//ul[@id='${id}']/li[text()='${value}']`));
    } else {
    option = element(by.xpath(`//ul/li[text()='${value}']`));
    }
    await browser.wait(EC.elementToBeClickable(option), 10000);
    // await browser.executeScript("arguments[0].scrollIntoView()", option.getWebElement());
    await highlightByJSExec(option);
    await option.click();
  }
}
