import { type Locator, type Page } from "@playwright/test";
import Methods from "./Methods.ts";


export class LoginPage extends Methods {
    /* =============== Locators =============== */
    readonly page:Page;
    private readonly usernameInput      : Locator;
    private readonly passwordInput      : Locator;
    private readonly loginButton        : Locator;
    private readonly demoCredentials    : Locator;

    constructor(page:Page) {
        super(page);
        this.page               = page;
        this.usernameInput      = page.getByPlaceholder('Username');
        this.passwordInput      = page.getByPlaceholder('Password');
        this.loginButton        = page.getByRole('button', { name: 'Login' });
        this.demoCredentials    = page.locator('.orangehrm-demo-credentials');
    }

    /* =============== Methods =============== */
    async waitPageLoad() {
        await this.page.waitForLoadState('load');
    }

    async fillUsername(username: string) {                              
        await this.fillAnElement(this.usernameInput, username);
    }

    async fillPassword(password: string) {
        await this.fillAnElement(this.passwordInput, password);
    }

    async clickLoginButton() {
        await this.clickAnElement(this.loginButton);
    }

    async getDemoCredentials(): Promise<{ username: string; password: string }> {
        const paragraphs = this.demoCredentials.locator('p');

        const usernameText = await paragraphs.nth(0).innerText();
        const passwordText = await paragraphs.nth(1).innerText();

        return {
            username: usernameText.split(': ')[1].trim(),
            password: passwordText.split(': ')[1].trim(),
        };
    }

    async login() {
        //getting the demo credentials from the page
        const { username, password } = await this.getDemoCredentials();

        //is username visible? if not, wait for the page to load
        if (!await this.usernameInput.isVisible()) {
            await this.waitPageLoad();
        }
        await this.fillUsername(username);
        await this.fillPassword(password);
        await this.clickLoginButton();
    }

}