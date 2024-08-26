// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
    testDir: './tests/playwright/tests',
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    workers: 80,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    timeout: 5 * 60000,
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: {
                ...devices['Desktop Chrome'],
                headless: true
            }
        }
        // {
        //     name: 'firefox',
        //     use: {
        //         ...devices['Desktop Firefox'],
        //         headless: true
        //     }
        // },

        // {
        //     name: 'webkit',
        //     use: {
        //         ...devices['Desktop Safari'],
        //         headless: true
        //     }
        // },
        // /* Test against mobile viewports. */
        // {
        //     name: 'Mobile Chrome',
        //     use: {
        //         ...devices['Pixel 5']
        //     }
        // },

        // {
        //     name: 'Mobile Safari',
        //     use: {
        //         ...devices['iPhone 12']
        //     }
        // },

        // /* Test against branded browsers. */
        // {
        //     name: 'Microsoft Edge',
        //     use: {
        //         ...devices['Desktop Edge'],
        //         channel: 'msedge'
        //     }
        // },
        // {
        //     name: 'Google Chrome',
        //     use: {
        //         ...devices['Desktop Chrome'],
        //         channel: 'chrome'
        //     }
        // }
    ],
    webServer: [
        {
            command: './.github/scripts/runServerV2.sh',
            timeout: 120 * 1000,
            reuseExistingServer: !process.env.CI
        }
    ],
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        baseURL: 'https://localhost.paypal.com:8080',
        ignoreHTTPSErrors: true,

        trace: 'on',
        bypassCSP: true,
        headless: !!process.env.CI || undefined,
        video: 'on'
    }
});
