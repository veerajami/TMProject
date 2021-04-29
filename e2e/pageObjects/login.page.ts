import { by, element } from "protractor";
import { WaitUtils } from "../utils/wait.utils";

export class LoginPage {
    private loginPageHeader = by.css(".px-5.d-flex.align-items-end.loginHeaderText");
    private userNameTxtBx = by.id("userId");
    private lastNameTxtBx = by.id("lastName");
    private passwordTxtBx = by.id("password");
    private loginBtn = by.xpath("//button[@type='submit']");

    public async validateLoginPage() {
        await WaitUtils.waitUntilElementToBeClickable(await element(this.userNameTxtBx),30000);
        await expect(await element(this.loginPageHeader).getText()).toContain("Log In To Delta")
    }

    public async login(userName: string, lastName: string, pwd: string) {
        await this.enterUserName(userName);
        await this.enterLastName(lastName);
        await this.enterPassword(pwd);
        await this.clickOnLogin();
    }

    public async enterUserName(username: string) {
        await element(this.userNameTxtBx).sendKeys(username);
    }

    public async enterLastName(lastName: string) {
        await element(this.lastNameTxtBx).sendKeys(lastName);
    }
    public async enterPassword(pwd: string) {
        await element(this.passwordTxtBx).sendKeys(pwd);
    }

    public async clickOnLogin() {
        await element(this.loginBtn).click();
    }
}