import { ElementFinder, browser } from "protractor";

export const highlightByJSExec = async (elements: ElementFinder) => {
    await browser.driver
        .executeScript(
            `arguments[0]
        .setAttribute("style", arguments[1]);`,
            elements.getWebElement(),
            "color: Red; border: 2px solid red;",
        )
        .then(
            () => {
                browser.sleep(100);
                return elements;
            },
            (err: Error) => {
                throw new Error(`Highlighter error :${err.message}`);
            },
        );
}