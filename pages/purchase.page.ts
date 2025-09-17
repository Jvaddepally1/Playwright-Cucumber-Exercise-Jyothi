import { Page } from "@playwright/test";

export class Purchase {
    private readonly page: Page;
    private readonly cartIcon = '.shopping_cart_link';
    private readonly checkoutButton = '[data-test="checkout"]';
    private readonly firstNameField = '[data-test="firstName"]';
    private readonly lastNameField = '[data-test="lastName"]';
    private readonly postalCodeField = '[data-test="postalCode"]';
    private readonly continueButton = '[data-test="continue"]';
    private readonly finishButton = '[data-test="finish"]';
    private readonly thankYouHeader = '.complete-header';

    constructor(page: Page) {
        this.page = page;
    }

    async goToCart() {
        await this.page.locator(this.cartIcon).click();
    }

    async checkout() {
        await this.page.locator(this.checkoutButton).click();
    }

    async fillCheckoutInfo(first: string, last: string, zip: string) {
        await this.page.locator(this.firstNameField).fill(first);
        await this.page.locator(this.lastNameField).fill(last);
        await this.page.locator(this.postalCodeField).fill(zip);
        // Wait 10 seconds after entering Zip code
        await this.page.waitForTimeout(10000);
    }

    async continueCheckout() {
        await this.page.locator(this.continueButton).click();
        // Wait 10 seconds after clicking Continue
        await this.page.waitForTimeout(10000);
    }

    async finishCheckout() {
        await this.page.locator(this.finishButton).click();
    }

    async getThankYouText(): Promise<string> {
        return await this.page.locator(this.thankYouHeader).innerText();
    }
}
