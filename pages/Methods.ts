import { type Locator, type Page } from "@playwright/test";


class Methods {
    
    readonly page:Page;

    constructor(page: Page) {
        this.page = page; 
    }
    
    /* =============== Methods =============== */
    /**
     * @function navigateTo It opens a specific URL within the actual capability
     * @param {String} path the URL path you want to pass to the Browser object
     */
    async navigateTo(path = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login') {
        await this.page.goto(path);
    }
    
    /**
     * @function clickAnElement It executes the main browser method to open a specific URL within the actual capability
     * @param {Locator} item A Selector to do a click;
     * @param {string} locator Wait for the selector relative to the element handle to satisfy state option (either appear/disappear from dom, or become visible/hidden). If at the moment of calling the method selector already satisfies the condition, the method will return immediately. If the selector doesn't satisfy the condition for the timeout milliseconds, the function will throw.
     */
     async clickAnElement(item: Locator, locator = '') {
        await this.page.waitForLoadState('load');
        if (locator) { //if the locator was sent, wait the element
            await this.waitForAnElement(locator);
        }
        await item.click();
    }
    /**
     * @function waitForAnElement It Wait for the selector relative to the element handle to satisfy state option
     * @param {string} locator Wait for the selector relative to the element handle to satisfy state option (either appear/disappear from dom, or become visible/hidden). If at the moment of calling the method selector already satisfies the condition, the method will return immediately. If the selector doesn't satisfy the condition for the timeout milliseconds, the function will throw.
     */
    async waitForAnElement(locator: string){
        if (locator) {
            await this.page.waitForSelector(locator);
        }
    }

    /**
     * @function hoverElement Wait for the element to be visible and then hover it
     * @param {Locator} item Enable hover state for an element,  which is reset upon next interaction.
     */
    async hoverAnElement(item: Locator, locator: string){
        await this.waitForAnElement(locator);
        await item.hover();
    }

    /**
     * @function fillAnElement Wait for the element to be visible and then fill it with the value sent as parameter
     * @param {Locator} item Enable hover state for an element,  which is reset upon next interaction.
     * @param {string} value The value to fill the element with
     */
    async fillAnElement(item: Locator, value: string){
        await item.waitFor({ state: 'visible' });
        await item.fill(value);
    }
}

export default Methods;