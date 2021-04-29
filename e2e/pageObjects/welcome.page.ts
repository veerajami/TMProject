import { by, element } from "protractor";

export class WelcomePage {
    private welcomeHeaderTxt = by.xpath(`(//h4[contains(text(),'Welcome to SkyMiles')])[1]`);

    /**
     * This method returnes the welcom pop up text
     * @author Jami
     * @returns
     * @memberof WelcomePage
     */
    public async getWelcomeText() {
        return await element(this.welcomeHeaderTxt).getText();
    }
}