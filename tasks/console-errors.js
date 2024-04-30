const puppeteer = require('puppeteer'); // eslint-disable-line
const { getSitemapUrls } = require('./get-sitemap-links'); // eslint-disable-line

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
  'prod.tools.shortbread.aws.dev',
  'aa0.awsstatic.com',
  'alpha.d2c.marketing.aws.dev',
  'vs-alpha.aws.amazon.com'
];

const LOCALHOST = 'http://localhost:3000';

const checkPage = async (url) => {
  const errorsFound = [];
  const browser = await puppeteer.launch({ headless: 'new' });

  const page = await browser.newPage();

  await page.setRequestInterception(true);

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
            message: errorText,
            stackTrace: message.stackTrace()
          });
        }
      }
    })

    .on('request', (interceptedRequest) => {
      const excludedFromScript = excludedScripts.some((excludedScript) => {
        return interceptedRequest.url().includes(excludedScript);
      });
      if (excludedFromScript) {
        interceptedRequest.abort();
      } else interceptedRequest.continue();
    });

  await page.goto(url, { waitUntil: 'domcontentloaded' });

  await browser.close();

  return errorsFound;
};

const consoleErrors = async (domain) => {
  const pagesToCheck = await getSitemapUrls(domain);
  let errorMessage = '';
  for (let i = 0; i < pagesToCheck.length; i++) {
    const url = pagesToCheck[i];
    console.log(`checking page ${url}`);
    const errorsFound = await checkPage(url);
    errorsFound.forEach((error) => {
      errorMessage += `${error.message} found on ${error.page}\n`;
    });
  }
  if (errorMessage != '') {
    console.log(
      `--------- Console errors have been found and need to be resolved in order to merge. -------
      ------- Please note that these errors could be on pages that were not edited in this PR. ---------`
    );
    console.log(errorMessage);
  }
  return errorMessage;
};

module.exports = {
  consoleErrors: async (domain = LOCALHOST) => {
    return await consoleErrors(domain);
  }
};
