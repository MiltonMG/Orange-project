import { test, expect } from '@playwright/test';
import { LoginPage, DashboardMenu, Pim, Directory, Methods } from '../../pages/index.ts';
import { MenuItems } from '../../utils/enums.ts';


test.describe( 'OrangeHRM Tests', () =>{
  // Declare the page objects
  let loginPage     :LoginPage;
  let dashboardMenu :DashboardMenu;
  let pim           :Pim;
  let directory     :Directory;
  let methods       :Methods;

  // Constants or variables to be used in the tests can be declared here
  const userName = 'MMUser';
  const lastName = 'Testing';

  test.beforeEach(async ({ page }) => {
    loginPage     = new LoginPage( page );
    dashboardMenu = new DashboardMenu( page );
    pim           = new Pim( page );
    directory     = new Directory( page );
    methods       = new Methods( page );
  });

  test('test-01: validar la creacion de un usuario nuevo', async ({ page }) => {
    await methods.navigateTo();
    await loginPage.login();
    await dashboardMenu.clickMenuItem(MenuItems.PIM);
    await pim.createEmployee(userName, lastName);
    await dashboardMenu.clickMenuItem(MenuItems.Directory);
    await directory.searchEmployee(`${userName} ${lastName}`);
    await page.waitForTimeout(5000);
    // await expect(page).toHaveTitle(/Playwright/);

  });

});
