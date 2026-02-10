
# Playwright Test Automation with Allure Reporting

This repository contains Playwright test automation scripts for running tests on a web application. The tests are executed **only in Chrome** using Playwright's Chromium browser. Allure is used to generate test reports after every test execution.

## Requirements

Before you start, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [Playwright](https://playwright.dev/) (for automating browser actions)
- [Allure Command Line](https://allure.qatools.ru/) (for generating test reports)

### Step 1: Clone the Repository

Clone the repository to your local machine.

```bash
git clone <repository-url>
cd <repository-folder>
```

### Step 2: Install Dependencies

Make sure you have the necessary dependencies installed:

```bash
npm install
```

This will install the required packages, including Playwright, Allure Playwright Reporter, and other dependencies.

### Step 3: Playwright Configuration

The Playwright configuration is set up to execute all tests **only in Chrome** (via Chromium). Here's a breakdown of the key parts:

- The configuration file (`playwright.config.js`) is set to use only the Chromium browser under the `projects` array.
- The tests will run using **Desktop Chrome** settings to ensure that the tests are executed on a desktop-like environment.

### Step 4: Running Tests

After installing dependencies, you can run the tests with the following command:

```bash
npx playwright test
```

This will execute all test files in the `tests/` directory using **Chrome** (Chromium).

### Step 5: Generating Allure Report

Once the tests have completed, the Allure report will be generated automatically. To view the report, you can use the following command:

```bash
allure serve allure-results
```

This command will start a local server and open the Allure report in your default web browser, where you can view detailed information about the test results, including:

- Test status (pass/fail)
- Test steps
- Logs and screenshots (if enabled)

### Step 6: Running Tests and Generating Allure Report in One Command

To run the tests and generate the Allure report automatically in one command, use the following npm script:

```bash
npm run test-and-report
```

This will:
1. Execute all tests in Chrome.
2. Generate the Allure report.
3. Open the Allure report in your browser.

### Optional: Running on CI/CD

If you're running the tests in a CI/CD pipeline, ensure that the environment variables are set accordingly (e.g., `CI` for Continuous Integration). The configuration includes retry logic on CI and restricts parallel test execution.

### Customizing the Configuration

- **Base URL**: If your application runs locally or on a different URL, you can modify the `baseURL` in the Playwright configuration (`playwright.config.js`).

- **Headless Mode**: By default, Playwright runs the tests in **headless mode** (without a UI). You can disable this by setting `headless: false` in the `use` section of `playwright.config.js`.

---

## Directory Structure

```
├── tests/                     # Folder containing all your test files
│   ├── q1.spec.js             # Test file for Scenario 1
│   ├── q2cartPage.spec.js     # Test file for Cart Page
│   ├── q2checkoutOverview.spec.js  # Test file for Checkout Overview
│   ├── q2checkoutPage.spec.js    # Test file for Checkout Page
│   ├── q2finalPage.spec.js    # Test file for Final Page
│   ├── q2productPage.spec.js  # Test file for Product Page
│   └── q3.spec.js             # Test file for Scenario 3
├── playwright.config.js       # Playwright configuration file
├── package.json              # NPM dependencies and scripts
└── README.md                 # This file
```

---

## Conclusion

This setup allows you to execute Playwright tests in **Chrome** (Chromium) and generate reports using **Allure**. You can modify the configuration for different browsers or reporting needs as required. The process is fully automated for both local and CI/CD execution.
