import { by, element } from "protractor";

export class WelcomePage {
    private welcomeHeaderTxt = by.xpath(`(//h4[contains(text(),'Welcome to SkyMiles')])[1]`);

    public async getWelcomeText() {
        return await element(this.welcomeHeaderTxt).getText();
    }
}