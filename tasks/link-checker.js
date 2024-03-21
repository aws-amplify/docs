const puppeteer = require('puppeteer'); // eslint-disable-line
const axios = require('axios'); // eslint-disable-line

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

/**
 * Helper function to consolidate link texts by Url
 * @param {{url: string, parentUrl: string, linkText: string}[]} links Array of link objects
 * @returns An object with the URL as key and value as an array of objects containing the parentUrl and linkText
 */
const consolidateByUrl = (links) => {
  const urlsToVisit = {};

  for (const link of links) {
    let href = link.url.split('#')[0];
    if (href.startsWith(GITHUB_CREATE_ISSUE_LINK)) {
      // remove query parameters from github new issue links
      href = href.split('?')[0];
    }

    if (href.startsWith(GITHUB_EDIT_LINK)) continue;

    if (!urlsToVisit.hasOwnProperty(href)) {
      urlsToVisit[href] = [
        {
          parentUrl: link.parentUrl,
          linkText: link.linkText
        }
      ];
    } else {
      urlsToVisit[href].push({
        parentUrl: link.parentUrl,
        linkText: link.linkText
      });
    }
  }

  return urlsToVisit;
};

/**
 * Uses puppeteer to visit each url from siteMapUrls and finds all the 'a' tags on each page to create a list of urls we need to visit
 * @param {string[]} siteMapUrls List of urls found from the sitemap
 * @param {string} localDomain The base url we are running the link checker on
 * @returns Array of urls we need to visit
 */
const retrieveLinks = async (siteMapUrls, localDomain) => {
  let browser = await puppeteer.launch({ headless: 'new' });

  let page = await browser.newPage();

  const urlsToVisit = [];

  for (let i = 0; i < siteMapUrls.length; i++) {
    let url = siteMapUrls[i];

    try {
      let response = await page.goto(url, { waitUntil: 'domcontentloaded' });
      await new Promise((r) => setTimeout(r, 100)); // localhost hangs on wait for idle so use a short timeout instead
      if (response && response.status() && response.status() === 200) {
        // Get all the links from the page
        const urlList = await page.evaluate(async (url) => {
          const urls = [];
          let elements;
          if (url === 'https://docs.amplify.aws/') {
            // On the homepage, grab all the links (nav bar, footer, left menu)
            elements = document.getElementsByTagName('a');
          } else {
            // On any other page, grab only the links in the main element
            elements = document.querySelector('main').getElementsByTagName('a');
          }

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

        console.log(
          `successfully visited ${url} to retrieve links. ${urlList.length} links found`
        );

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

  // Merge duplicate urls
  return consolidateByUrl(urlsToVisit);
};

/**
 * Format the broken links output for slack
 * @param {{url: string, pages: {parentUrl: string, linkText: string}[]}[]} inputs
 * @returns String that slack uses to notify that there are broken links
 *
 * example argument, 'inputs':
 * [
 *  {
 *    "url": "http://localhost:3000/test/build-a-backend/more-features/analytics/",
 *    "pages": [
 *      {
 *        "parentUrl": "http://localhost:3000/gen2/build-a-backend/add-aws-services/analytics/",
 *        "linkText": "Analytics documentation"
 *      },
 *      {
 *        "parentUrl": "http://localhost:3000/gen2/build-a-backend/add-aws-services/analytics/",
 *        "linkText": "another one"
 *      },
 *      {
 *        "parentUrl": "http://localhost:3000/gen2/build-a-backend/functions/",
 *        "linkText": "another broken one"
 *      }
 *    ]
 *  }
 * ]
 */
const formatString = (inputs) => {
  let retString = '';
  inputs.forEach((item) => {
    Object.keys(item).forEach((k) => {
      if (k === 'url') {
        retString += `Broken url: ${item[k]} \\n`;
      } else if (k === 'pages') {
        retString += `On pages: \\n`;
        item[k].forEach((page) => {
          retString += `• ${page.parentUrl} \\n`;
          retString += `   • For link text: \\"${page.linkText}\\" \\n`;
        });
      }
    });
    retString += '\\n \\n';
  });

  return retString;
};

/**
 * Makes a request to each link to check for 404s
 * @param {string} localDomain Base url for the links to check
 * @param {string[]} links List of urls as strings to check. If this array is passed then the link checker will only look at these links
 * @returns Urls that returned a 404
 */
const linkChecker = async (localDomain, links) => {
  const statusCodes = {};
  const brokenLinks = [];

  let urlsToVisit;

  if (Array.isArray(links) && links.length > 0) {
    urlsToVisit = await retrieveLinks(links, localDomain);
  } else {
    const siteMapUrls = await getSitemapUrls(localDomain);

    urlsToVisit = await retrieveLinks(siteMapUrls, localDomain);
  }

  console.log('Visiting urls...\n');

  for (const href in urlsToVisit) {
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
          brokenLinks.push({ url: href, pages: urlsToVisit[href] });
        }
      });

    await request;
  }

  console.log('\n');
  console.log('Status codes:\n', JSON.stringify(statusCodes, null, 2));
  console.log('\n');
  console.log('Broken links:\n', JSON.stringify(brokenLinks, null, 2));

  return formatString(brokenLinks);
};

module.exports = {
  checkProdLinks: async () => {
    return await linkChecker();
  },
  checkDevLinks: async () => {
    return await linkChecker('http://localhost:3000');
  },
  checkSpecificLinks: async (localDomain, links) => {
    return await linkChecker(localDomain, links);
  }
};
