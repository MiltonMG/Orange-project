import { type Locator, type Page } from "@playwright/test";
import Methods from "./Methods.ts";


export class Pim extends Methods {
    /* =============== Locators =============== */
    readonly page               : Page;
    private readonly addButton  : Locator;
    private readonly firstName  : Locator;
    private readonly lastName   : Locator;
    private readonly perfilImage: Locator;
    private readonly saveButton : Locator;
    private readonly editPanel : Locator;

    constructor(page:Page) {
        super(page);
        this.page           = page;
        this.addButton      = page.getByRole('button', { name: 'Add' });
        this.firstName      = page.getByPlaceholder('First Name');
        this.lastName       = page.getByPlaceholder('Last Name');
        this.perfilImage    = page.locator('input.oxd-file-input');
        this.saveButton     = page.getByRole('button', { name: 'Save' });
        this.editPanel    = page.locator('.orangehrm-edit-employee-content');
    }

    /* =============== Methods =============== */
    async clickAddButton() {
        await this.clickAnElement(this.addButton);
    }
    async fillFirstName(firstName: string) {
        await this.fillAnElement(this.firstName, firstName);
    }
    async fillLastName(lastName: string) {
        await this.fillAnElement(this.lastName, lastName);
    }
    async uploadPerfilImage(imagePath: string) {
        await this.perfilImage.setInputFiles(imagePath);
    }
    async clickSaveButton() {
        await this.clickAnElement(this.saveButton);
    }
    async createEmployee(firstName: string, lastName: string) {
        await this.clickAddButton();
        await this.fillFirstName(firstName);
        await this.fillLastName(lastName);
        await this.uploadPerfilImage('assets/images/foto-perfil.png');
        await this.clickSaveButton();
        await this.editPanel.waitFor({ state: 'visible' });
    }


}