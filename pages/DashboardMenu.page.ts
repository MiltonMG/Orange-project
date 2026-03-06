import { type Locator, type Page } from "@playwright/test";
import Methods from "./Methods.ts";
import { MenuItems } from "../utils/enums.ts";


export class DashboardMenu extends Methods {
    /* =============== Locators =============== */
    readonly page:Page;
    private readonly menuItems: Locator;

    constructor(page:Page) {
        super(page);
        this.page       = page;
        this.menuItems  = page.locator('.oxd-main-menu-item--name');
    }
    
    /* =============== Methods =============== */
    async clickMenuItem(name: MenuItems) {
        await this.menuItems.filter({ hasText: name }).click();
    }

}