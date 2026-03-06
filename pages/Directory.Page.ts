import { type Locator, type Page } from "@playwright/test";
import Methods from "./Methods.ts";


export class Directory extends Methods {
    /* =============== Locators =============== */
    readonly page:Page;
    private readonly employeeName  : Locator;
    private readonly searchButton  : Locator;


    constructor(page:Page) {
        super(page);
        this.page = page
        this.employeeName  = page.getByPlaceholder('Type for hints...');
        this.searchButton  = page.getByRole('button', { name: 'Search' });
    }

    /* =============== Methods =============== */
    async fillEmployeeName(employeeName: string) {
        await this.fillAnElement(this.employeeName, employeeName);
    }
    async clickSearchButton() {
        await this.clickAnElement(this.searchButton);
    }
    async searchEmployee(employeeName: string) {
        //wait for the employee name input to be visible, fill it and click the search button
        await this.employeeName.waitFor({ state: 'visible' });
        await this.fillEmployeeName(employeeName);
        await this.clickSearchButton();
    }

}