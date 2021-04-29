import { by, element } from "protractor";

export class FirstClassPage {
    private bookNowBtn = by.xpath("//a[normalize-space()='BOOK NOW']");

    /**
     * This method performs click operation on book now button
     * @author Jami
     * @memberof FirstClassPage
     */
    public async clickOnBookNow() {
        await element(this.bookNowBtn).click();
    }
}