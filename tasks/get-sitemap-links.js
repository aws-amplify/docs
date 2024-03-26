const puppeteer = require('puppeteer'); // eslint-disable-line

const DOMAIN = 'https://docs.amplify.aws';
const SITEMAP_URL = 'https://docs.amplify.aws/sitemap.xml';

const getSitemapUrls = async (localDomain) => {
  let browser = await puppeteer.launch({ headless: 'new' });

  const page = await browser.newPage();

  let siteMap = localDomain ? `${localDomain}/sitemap.xml` : SITEMAP_URL;
  let response = await page.goto(siteMap);

  const siteMapUrls = [];

  if (response && response.status() && response.status() === 200) {
    const urlTags = await page.evaluateHandle(() => {
      return document.getElementsByTagName('loc');
    });
    const numOfLinks = await page.evaluate((e) => e.length, urlTags);
    for (let i = 0; i < numOfLinks; i++) {
      let url = await page.evaluate(
        (urlTags, i) => urlTags[i].innerHTML,
        urlTags,
        i
      );
      if (localDomain) {
        // Currently the sitemap is always generated with the prod docs domain so we need to replace this with localhost
        url = url.replace(DOMAIN, localDomain);
      }
      siteMapUrls.push(url);
    }
  }
  browser.close();
  return siteMapUrls;
};

module.exports = {
  getSitemapUrls: async (domain) => {
    return await getSitemapUrls(domain);
  }
};
