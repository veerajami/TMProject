import { by, element } from "protractor";

export class FirstClassPage {
    private bookNowBtn = by.xpath("//a[normalize-space()='BOOK NOW']");

    public async clickOnBookNow() {
        await element(this.bookNowBtn).click();
    }
}