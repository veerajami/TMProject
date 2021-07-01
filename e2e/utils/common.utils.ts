import { readdirSync, rmdirSync, statSync, unlinkSync } from "fs";
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

export const removeDir = (dirPath: string) => {
    let files;
    try {
        files = readdirSync(dirPath);
    } catch (e) {
        return;
    }
    if (files.length > 0) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < files.length; i++) {
            const filePath = dirPath + '/' + files[i];
            if (statSync(filePath).isFile()) {
                unlinkSync(filePath);
            } else {
                removeDir(filePath);
            }
        }
    }
    rmdirSync(dirPath);
}