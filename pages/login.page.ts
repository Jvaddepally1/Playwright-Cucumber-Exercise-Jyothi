import { Page } from "@playwright/test"

export class Login {
    private readonly page: Page
    private readonly password: string = 'secret_sauce'
    private readonly passwordField: string = 'input[id="password"]'
    private readonly userNameField: string = 'input[id="user-name"]'
    private readonly loginButton: string = 'input[id="login-button"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async validateTitle(expectedTitle: string) {
        const pageTitle = await this.page.title();
        if (pageTitle !== expectedTitle) {
          throw new Error(`Expected title to be ${expectedTitle} but found ${pageTitle}`);
        }
    }

    public async loginAsUser(userName: string) {
        await this.page.locator(this.userNameField).fill(userName)
        await this.page.locator(this.passwordField).fill(this.password)
        await this.page.locator(this.loginButton).click()
        // Wait briefly after login click to allow navigation/DOM update
        await this.page.waitForTimeout(2000);
        // Only wait for inventory page if not locked_out_user
        if (userName !== 'locked_out_user') {
            // Wait for either inventory page or error message
            await Promise.race([
                this.page.locator('[data-test="product-sort-container"]').waitFor({ state: 'visible', timeout: 10000 }),
                this.page.locator('[data-test="error"]').waitFor({ state: 'visible', timeout: 10000 })
            ]);
        }
    }

    public async getErrorMessage(): Promise<string> {
        return await this.page.locator('[data-test="error"]').innerText();
    }
}