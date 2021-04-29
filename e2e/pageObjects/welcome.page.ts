import { by, element } from "protractor";
import { WaitUtils } from "../utils/wait.utils";

export class WelcomePage {
    private welcomeHeaderTxt = by.xpath(`(//h4[contains(text(),'Welcome to SkyMiles')])[1]`);

    public async validateWelcomePage(user: string) {
        await WaitUtils.waitUntilPresenceOfElement(element(this.welcomeHeaderTxt),30000);
        const welcomeText: string = await this.getWelcomeText();
        await expect(welcomeText).toContain(`${user}`);
    }

    public async getWelcomeText() {
        return await element(this.welcomeHeaderTxt).getText();
    }
}