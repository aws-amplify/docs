const puppeteer = require('puppeteer');
const axios = require('axios');

const SITEMAP_URL = 'https://docs.amplify.aws/sitemap.xml';
const DOMAIN = 'https://docs.amplify.aws';
const CRAWLER_EXCEPTIONS = [
  'https://aaaaaaaaaa.execute-api.us-east-1.amazonaws.com/api',
  'https://aaaaaaaaaaaaaaaaaaaaaaaaaa.appsync-api.us-east-1.amazonaws.com/graphql',
  'https://twitter.com/AWSAmplify'
];
const GITHUB_CREATE_ISSUE_LINK =
  'https://github.com/aws-amplify/docs/issues/new';
const GITHUB_EDIT_LINK = 'https://github.com/aws-amplify/docs/edit/';

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

const retrieveLinks = async (siteMapUrls, visitedLinks, localDomain) => {
  let browser = await puppeteer.launch({ headless: 'new' });

  let page = await browser.newPage();

  const urlsToVisit = [];

  for (let i = 0; i < siteMapUrls.length; i++) {
    let url = siteMapUrls[i];

    try {
      let response = await page.goto(url, { waitUntil: 'domcontentloaded' });
      await new Promise((r) => setTimeout(r, 100)); // localhost hangs on wait for idle so use a short timeout instead
      if (response && response.status() && response.status() === 200) {
        console.log(`successfully visited ${url} to retrieve links`);
        visitedLinks[url] = true;

        const urlList = await page.evaluate(async (url) => {
          let urls = [];
          let elements = document.getElementsByTagName('a');
          for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            if (element.href) {
              const link = {
                url: element.href,
                parentUrl: url,
                linkText: element.textContent
              };
              urls.push(link);
            }
          }
          return urls;
        }, url);

        urlList.forEach((link) => {
          if (
            !CRAWLER_EXCEPTIONS.includes(link.url) &&
            (!localDomain || link.url.startsWith(localDomain))
          ) {
            urlsToVisit.push(link);
          }
        });
      }
    } catch (e) {
      console.log(`failed to load ${url}: ${e}`);
      browser.close();
      browser = await puppeteer.launch({ headless: 'new' });
      page = await browser.newPage();
    }
  }

  browser.close();

  return urlsToVisit;
};

const formatString = (inputs) => {
  let retString = '';
  inputs.forEach((item) => {
    Object.keys(item).forEach((k) => {
      retString += `${k} - ${item[k]} \\n`;
    });
    retString += '\\n \\n';
  });
  return retString;
};

const linkChecker = async (localDomain) => {
  const visitedLinks = {};
  const statusCodes = {};
  const brokenLinks = [];

  const siteMapUrls = await getSitemapUrls(localDomain);

  const urlsToVisit = await retrieveLinks(
    siteMapUrls,
    visitedLinks,
    localDomain
  );

  let allPromises = [];

  for (let i = 0; i < urlsToVisit.length; i++) {
    const link = urlsToVisit[i];
    let href = link.url;
    if (href.startsWith(GITHUB_CREATE_ISSUE_LINK)) {
      // remove query parameters from github new issue links
      href = href.split('?')[0];
    }
    if (href.startsWith(GITHUB_EDIT_LINK)) continue;
    if (visitedLinks[href]) continue;
    visitedLinks[href] = true;

    let request = axios
      .get(href, {
        timeout: 5000
      })
      .then((response) => {
        let statusCode = response.status;
        if (statusCode && statusCode !== 200) {
          statusCodes[statusCode] = statusCodes[statusCode] || [];
          statusCodes[statusCode].push(href);
        }
      })
      .catch((e) => {
        let statusCode = e?.response?.status;
        if (statusCode) {
          statusCodes[statusCode] = statusCodes[statusCode] || [];
          statusCodes[statusCode].push(href);
        }
        if (statusCode === 404) {
          brokenLinks.push(link);
        }
      });

    allPromises.push(request);
  }

  await Promise.all(allPromises);

  console.log(statusCodes);
  console.log(brokenLinks);

  return formatString(brokenLinks);
};

module.exports = {
  checkProdLinks: async () => {
    return await linkChecker();
  },
  checkDevLinks: async () => {
    return await linkChecker('http://localhost:3000');
  }
};
