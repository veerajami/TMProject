import { by, element } from "protractor";
import { WaitUtils } from "../utils/wait.utils";

export class LoginPage {
    private loginPageHeader = by.css(".px-5.d-flex.align-items-end.loginHeaderText");
    private userNameTxtBx = by.id("userId");
    private lastNameTxtBx = by.id("lastName");
    private passwordTxtBx = by.id("password");
    private loginBtn = by.xpath("//button[@type='submit']");

    /**
     * This method validates the login page displayed
     * @author Jami
     * @memberof LoginPage
     */
    public async validateLoginPage() {
        await WaitUtils.waitUntilElementToBeClickable(await element(this.userNameTxtBx),30000);
        await expect(await element(this.loginPageHeader).getText()).toContain("Log In To Delta")
    }

    /**
     * This method performs login operation with given credentials
     * @author Jami
     * @param {string} userName
     * @param {string} lastName
     * @param {string} pwd
     * @memberof LoginPage
     */
    public async login(userName: string, lastName: string, pwd: string) {
        await this.enterUserName(userName);
        await this.enterLastName(lastName);
        await this.enterPassword(pwd);
        await this.clickOnLogin();
    }

    /**
     * This method enters the given text on user name textbox
     *
     * @param {string} username
     * @memberof LoginPage
     */
    public async enterUserName(username: string) {
        await element(this.userNameTxtBx).sendKeys(username);
    }

    /**
     * This method enters the given text on last name textbox
     * @author Jami
     * @param {string} lastName
     * @memberof LoginPage
     */
    public async enterLastName(lastName: string) {
        await element(this.lastNameTxtBx).sendKeys(lastName);
    }
    /**
     * This method enters the given text on passoword textbox
     * @author Jami
     * @param {string} pwd
     * @memberof LoginPage
     */
    public async enterPassword(pwd: string) {
        await element(this.passwordTxtBx).sendKeys(pwd);
    }

    /**
     * This method performs click operation on login button
     * @author Jami
     * @memberof LoginPage
     */
    public async clickOnLogin() {
        await element(this.loginBtn).click();
    }
}