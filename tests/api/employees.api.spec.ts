// tests/api/employees.api.spec.ts
import { test, expect } from '@playwright/test';

test.describe('API OrangeHRM - Empleados', () => {

  test('GET /pim/employees → lista empleados', async ({ page }) => {

    await test.step('Enviar solicitud GET a la API de empleados', async () => {
      const response = await page.request.get(
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees'
      );

      expect(response.status()).toBe(200);
    });

    await test.step('Validar estructura de la respuesta', async () => {
      const response = await page.request.get(
        'https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/pim/employees'
      );
      const body = await response.json();

      console.log('Status:', response.status());
      console.log('Headers:', response.headers());
      console.log('Body:', JSON.stringify(body, null, 2));

      expect(body).toHaveProperty('data');
      expect(Array.isArray(body.data)).toBeTruthy();
      expect(body.data.length).toBeGreaterThan(0);
      // console.log('Total empleados:', body.meta?.total);
    });
  });

});