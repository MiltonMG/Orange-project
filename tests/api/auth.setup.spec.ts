import { test, expect } from '@playwright/test';
import path from 'path';

const AUTH_FILE = 'playwright/.auth/session.json';

test('autenticación - guardar sesión', async ({ page }) => {

  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

  await page.fill('input[name="username"]', 'Admin');
  await page.fill('input[name="password"]', 'admin123');
  await page.click('button[type="submit"]');

  await page.waitForURL('**/dashboard/**');

  await page.context().storageState({ path: AUTH_FILE }); // Save the authentication state to a file, cookies, localStorage, etc.
});