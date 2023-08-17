const puppeteer = require('puppeteer');
const axios = require('axios');

const SITEMAP_URL = 'https://docs.amplify.aws/sitemap.xml';
const CRAWLER_EXCEPTIONS = [
  'https://aaaaaaaaaa.execute-api.us-east-1.amazonaws.com/api',
  'https://aaaaaaaaaaaaaaaaaaaaaaaaaa.appsync-api.us-east-1.amazonaws.com/graphql',
  'https://twitter.com/AWSAmplify'
];
const GITHUB_CREATE_ISSUE_LINK =
  'https://github.com/aws-amplify/docs/issues/new';
const GITHUB_EDIT_LINK = 'https://github.com/aws-amplify/docs/edit/';

const getSitemapUrls = async () => {
  let browser = await puppeteer.launch();

  const page = await browser.newPage();

  let response = await page.goto(SITEMAP_URL);

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
      siteMapUrls.push(url);
    }
  }

  browser.close();

  return siteMapUrls;
};

const retrieveLinks = async (siteMapUrls, visitedLinks) => {
  let browser = await puppeteer.launch();

  const page = await browser.newPage();

  const urlsToVisit = [];

  for (let i = 0; i < siteMapUrls.length; i++) {
    let url = siteMapUrls[i];

    let response = await page.goto(url);
    if (response && response.status() && response.status() === 200) {
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
        if (!CRAWLER_EXCEPTIONS.includes(link.url)) {
          urlsToVisit.push(link);
        }
      });
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

const linkChecker = async () => {
  const visitedLinks = {};
  const statusCodes = {};
  const brokenLinks = [];

  const siteMapUrls = await getSitemapUrls();

  const urlsToVisit = await retrieveLinks(siteMapUrls, visitedLinks);

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
      .get(href)
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
          // this regular expression is meant to filter out any of the platform selector pages.  These are appearing in the result set
          // because the crawler is seeing disabled platform dropdown links
          const platformPages = /\/q\/(platform|integration|framework)\/(android|ios|flutter|js|react-native)/gm;
          if (!platformPages.test(link.url)) {
            brokenLinks.push(link);
          }
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
  checkLinks: async () => {
    return await linkChecker();
  }
};
