import { type Locator, type Page } from "@playwright/test";
import Methods from "./Methods.ts";


export class Directory extends Methods {
    /* =============== Locators =============== */
    readonly page:Page;
    private readonly employeeNameInput  : Locator;
    private readonly employeeCard       : Locator;
    private readonly employeeCardText   : Locator;
    private readonly searchButton       : Locator;
    private readonly listboxOption      : Locator;
    private readonly listboxIsLoading   : Locator;
    private readonly UsersLoading       : Locator;


    constructor(page:Page) {
        super(page);
        this.page = page
        this.employeeNameInput  = page.getByPlaceholder('Type for hints...');
        this.employeeCard       = page.locator('.orangehrm-directory-card').first();
        this.employeeCardText   = this.employeeCard.locator('p').first();
        this.searchButton       = page.getByRole('button', { name: 'Search' });
        this.listboxOption      = page.locator('[role="listbox"] [role="option"]').first();
        this.listboxIsLoading   = page.getByText('Searching....');
        this.UsersLoading       = page.getByText('.orangehrm-container-loader');
    }

    /* =============== Methods =============== */

    async fillEmployeeName(employeeName: string) {
        await this.employeeNameInput.pressSequentially(employeeName, { delay: 100 });
    }

    async clickSearchButton() {
        await this.clickAnElement(this.searchButton);
    }

    async searchEmployee(employeeName: string) {
        //wait for the employee name input to be visible, fill it and click the search button
        await this.employeeNameInput.waitFor({ state: 'visible' });
        await this.fillEmployeeName(employeeName);
        await this.listboxIsLoading.waitFor({ state: 'hidden' });
        await this.listboxOption.waitFor({ state: 'visible' });
        await this.listboxOption.click();
        await this.clickSearchButton();
    }

    async getEmployeeNameFromCard(): Promise<string | null> {
        //wait for the employee card to be visible and validate that it contains the employee name
        await this.UsersLoading.waitFor({ state: 'hidden' });
        await this.employeeCardText.waitFor({ state: 'visible' });
        const cardText = await this.employeeCardText.textContent();
        return cardText;
    }

    async clickEmployeeCard() {
        await this.UsersLoading.waitFor({ state: 'hidden' });
        await this.clickAnElement(this.employeeCard);
    }

}