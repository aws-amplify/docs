const puppeteer = require('puppeteer');

const caughtErrorTypes = [
  {
    type: 'Hydration Error',
    errorText: 'Hydration failed'
  }
];

const PAGESTOCHECK = [
  '/',
  '/lib/q/platform/js/',
  '/cli/',
  '/console/',
  '/guides/q/platform/js/',
  '/start/q/integration/js/'
];

const checkPage = async (url) => {
  const errorsFound = [];
  let browser = await puppeteer.launch({ headless: 'new' });

  const page = await browser.newPage();

  page.on('console', (message) => {
    const type = message.type();
    if (type && type.toLowerCase() === 'error') {
      caughtErrorTypes.forEach((errorType) => {
        if (message.text().includes(errorType.errorText)) {
          errorsFound.push({
            page: url,
            errorType: errorType.type,
            message: message.text()
          });
        }
      });
    }
  });

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  browser.close();

  return errorsFound;
};

const consoleErrors = async (domain) => {
  let errorMessage = '';
  for (let i = 0; i < PAGESTOCHECK.length; i++) {
    let url = `${domain}${PAGESTOCHECK[i]}`;
    let errorsFound = await checkPage(url);
    errorsFound.forEach((error) => {
      errorMessage += `${error.errorType} found on ${error.page}\n`;
    });
  }
  return errorMessage;
};

module.exports = {
  consoleErrors: async (domain) => {
    return await consoleErrors(domain);
  }
};
