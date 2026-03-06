import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  timeout: 60000,
  workers: 1,
  reporter: 'html',
  use: {
    baseURL: 'https://opensource-demo.orangehrmlive.com',
    headless: true,
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /auth\.setup\.ts/,
    },
    {
      name: 'api-tests',
      dependencies: ['setup'],
      testMatch: '**/tests/api/**/*.spec.ts',
      use: {
        storageState: 'playwright/.auth/session.json',
      },
    },
    {
      name: 'chromium',
      testMatch: '**/tests/e2e/*.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
