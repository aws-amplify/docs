const puppeteer = require('puppeteer');
const { getSitemapUrls } = require('./get-sitemap-links');
const { LOCALHOST } = require('../src/constants/tasks');

// Here we are excluding shortbread errors because these are domain specific and are expected to fail in a local environment
const excludedErrors = [
  {
    type: 'Shortbread',
    errorText:
      "Shortbread failed to set user's cookie preference because the domain name that was passed"
  }
];

const excludedScripts = [
  'prod.assets.shortbread.aws',
  'prod.tools.shortbread.aws',
  'aa0.awsstatic.com'
];

const checkPage = async (url) => {
  const errorsFound = [];
  const browser = await puppeteer.launch({ headless: 'new' });

  const page = await browser.newPage();

  page
    .on('pageerror', (message) => {
      const errorText = message.message;
      const excluded = excludedErrors.some((excludedError) => {
        return errorText.includes(excludedError.errorText);
      });

      if (!excluded) {
        errorsFound.push({
          page: url,
          message: errorText
        });
      }
    })
    .on('console', (message) => {
      if (message.type().toLowerCase() === 'error') {
        const errorText = message.text();
        const callingScript = message.location().url;
        const excludedFromError = excludedErrors.some((excludedError) => {
          return errorText.includes(excludedError.errorText);
        });
        const excludedFromScript = excludedScripts.some((excludedScript) => {
          return callingScript.includes(excludedScript);
        });
        const excluded = excludedFromError || excludedFromScript;

        if (!excluded) {
          errorsFound.push({
            page: url,
            message: errorText
          });
        }
      }
    });

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  await browser.close();

  return errorsFound;
};

const consoleErrors = async (domain) => {
  const pagesToCheck = await getSitemapUrls(domain);
  const errorMessage = '';
  for (let i = 0; i < pagesToCheck.length; i++) {
    const url = pagesToCheck[i];
    console.log(`checking page ${url}`);
    const errorsFound = await checkPage(url);
    errorsFound.forEach((error) => {
      errorMessage += `${error.message} found on ${error.page}\n`;
    });
  }
  console.log(errorMessage);
  return errorMessage;
};

module.exports = {
  consoleErrors: async (domain = LOCALHOST) => {
    return await consoleErrors(domain);
  }
};
