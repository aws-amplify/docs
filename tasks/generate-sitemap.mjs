import { promises as fs } from 'fs';
import { cwd } from 'node:process';
import { execSync } from 'child_process';
import crypto from 'node:crypto';
import path from 'path';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
dotenv.config({ path: './.env.custom' });

const SITEMAP_DOMAIN = process.env.SITEMAP_DOMAIN
  ? process.env.SITEMAP_DOMAIN
  : 'https://docs.amplify.aws';

// Path of the Next.js static HTML build output
const ROOT_PATH = path.resolve(cwd(), 'client/www/next-build');

const formatDate = (date) => `${date.toISOString().split('.')[0]}+0:00`;
const getPriority = () => 0.5;

const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;
const xmlUrlWrapper = (nodes) => `${xmlHeader}
  ${nodes}
</urlset>`;

/**
 * Helper function to create the XML url node
 * @param {string[]} htmlPageData String array of the HTML filepath and its last modified date (e.g. ['../../client/www/next-build/index.html', '2022-05-12T16:00:00.000Z'])
 * @returns {string} XML url node
 */
const xmlUrlNode = async (htmlPageData) => {
  const urlPath = htmlPageData[0]
    .replace(ROOT_PATH, '')
    .replace('index.html', '');

  const lastmod = htmlPageData[1]
    ? formatDate(new Date(htmlPageData[1]))
    : formatDate(new Date());
  const loc = `${SITEMAP_DOMAIN}${urlPath}`;
  const priority = getPriority(urlPath);
  return `
<url>
  <loc>${loc}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>hourly</changefreq>
  <priority>${priority}</priority>
</url>`;
};

/**
 * Finds all the HTML files within a directory. This function uses execSync to run the bash command 'find'
 * @param {string} dir String representing the directory path to look for all the HTML files. (e.g. 'client/www/next-build')
 * @returns {string[]} Array of strings representing the paths to all the HTML files in the directory.
 */
function findHtmlFiles(dir) {
  try {
    const htmlFiles = execSync(`find ${dir} -type f -name "*.html"`, {})
      .toString()
      .split('\n');

    return htmlFiles;
  } catch (e) {
    console.warning(
      'Did not find any files in directory. Did you pass in the correct path?'
    );
    return [];
  }
}

/**
 * Helper function to check if a string is an internal URL
 * @param {string} href
 * @returns {boolean}
 */
function isInternalLink(href) {
  const PLATFORMS = [
    'android',
    'flutter',
    'swift',
    'angular',
    'javascript',
    'nextjs',
    'react',
    'react-native',
    'vue'
  ];

  let matches;

  if (href.startsWith('/gen1')) {
    const regex = /^\/gen1\/([^\/]+)\//;
    matches = href.match(regex);
  } else {
    const regex = /^\/([^\/]+)\//;
    matches = href.match(regex);
  }

  if (matches && matches.length > 1) {
    const platform = matches[1];
    if (PLATFORMS.includes(platform)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

/**
 * Helper function to replace the platform specific subpath of the href argument with the string 'platform'.
 * This helps make the pages more uniform for when we hash the content from the main element
 * @param {string} href
 * @returns
 */
function replacePlatformHref(href) {
  if (href.startsWith('/gen1')) {
    const regex = /^\/gen1\/([^\/]+)\//;

    return href.replace(regex, 'platform');
  } else {
    const regex = /^\/([^\/]+)\//;

    return href.replace(regex, '/platform/');
  }
}

/**
 * Process the HTML file to do these things:
 *  - Get the last updated date from the page
 *  - Hash the main content of the page
 * @param {string} htmlFilePath File path of the HTML to process
 * @returns {Object} value The values needed from processing the HTML file
 * @returns {string} value.hash Hash of the main content of the HTML file
 * @returns {string} value.lastUpdatedDate Last updated date of the HTML file
 */
async function processHtmlFile(htmlFilePath) {
  try {
    if (htmlFilePath && htmlFilePath.length > 0) {
      const htmlContent = await fs.readFile(htmlFilePath, 'utf-8');

      const $ = cheerio.load(htmlContent);

      // Get the last updated date from the page
      const lastUpdatedDate = $('.page-last-updated')
        .text()
        .replace('Page updated', '');

      // Remove elements to help compare the pages
      $('.breadcrumb__container').remove();
      $('img').remove();
      $('.next-prev').remove();

      // Go through each link in main to remove the platform from internal links.
      // This helps reduce the "difference" between the pages so that we can compare the content better.
      // Without this change, a lot of pages would be considered different because the internal links
      // in the page point to the platform specific pages.
      const linksInMain = $('main a');
      linksInMain.each((index, link) => {
        const href = $(link).attr('href');
        if (isInternalLink(href)) {
          $(link).attr('href', replacePlatformHref(href));
        }
      });

      const mainContent = $('main').html();

      const hash = crypto
        .createHash('sha256')
        .update(mainContent)
        .digest('hex');

      return {
        hash,
        lastUpdatedDate
      };
    }
  } catch (error) {
    console.error(`Error reading file ${htmlFilePath}:`, error);
  }
}

/**
 * Finds duplicate HTML files in a directory and groups them together in a Map
 * @param {string[]} htmlFiles List of strings representing the paths to all the HTML files in the directory
 * @returns {Map<string, string[][]>} Group of duplicate html pages (and their last updated date) grouped by their hashed value
 */
async function groupDuplicateHtmlFiles(htmlFiles) {
  const hashes = new Map();

  for (let filePath of htmlFiles) {
    const htmlPageData = await processHtmlFile(filePath);

    if (htmlPageData && htmlPageData.hash) {
      if (!hashes.has(htmlPageData.hash)) {
        hashes.set(htmlPageData.hash, [
          [filePath, htmlPageData.lastUpdatedDate]
        ]);
      } else {
        // Found duplicate, push the file onto the existing array
        hashes
          .get(htmlPageData.hash)
          .push([filePath, htmlPageData.lastUpdatedDate]);
      }
    }
  }

  return hashes;
}

/**
 * Finds the highest ranking page to be used in the sitemap as the canonical url
 * @param {string[][]} pages Array of page names with their last modified date
 *   (e.g. [['/react/my/page', 'Mar 19, 2024'], ['/javascript/my/page', 'Jan 5, 2024'], ['/nextjs/my/page', 'Feb 20, 2024']])
 * @returns {string[]} The highest ranking page and its last modified date (e.g. ['/react/my/page', 'Mar 19, 2024'])
 */
function findHighestRankPage(pages) {
  const PLATFORM_RANKINGS = {
    react: 1,
    javascript: 2,
    nextjs: 3,
    angular: 4,
    swift: 5,
    android: 6,
    'react-native': 7,
    flutter: 8,
    vue: 9
  };

  if (pages.length === 1) {
    return pages[0];
  }

  const sortedRanks = Object.entries(PLATFORM_RANKINGS).sort(
    (a, b) => a[1] - b[1]
  );

  for (const [platform] of sortedRanks) {
    for (const page of pages) {
      const platformRegex = new RegExp(`\/${platform}\/`);
      if (platformRegex.test(page[0])) {
        return page;
      }
    }
  }
}

/**
 * Generates the sitemap from the HTML files created by the Next.js build with only the canonical urls
 */
async function generateSitemap() {
  console.log('generating sitemap.xml file...');
  const sitemapPath = `${ROOT_PATH}/sitemap.xml`;

  const htmlPages = findHtmlFiles(ROOT_PATH);
  const pages = await groupDuplicateHtmlFiles(htmlPages);

  // Find the highest ranking page to be used as the canonical url
  const canonicalPages = [...pages].map((hashedEntry) => {
    const pagePaths = hashedEntry[1];
    return findHighestRankPage(pagePaths);
  });

  let xmlUrlNodes = '';
  for (const page of canonicalPages) {
    xmlUrlNodes += await xmlUrlNode(page);
  }

  const sitemap = `${xmlUrlWrapper(xmlUrlNodes)}`;

  try {
    await fs.writeFile(sitemapPath, sitemap);
    console.log(`sitemap written to ${sitemapPath}`);
  } catch (error) {
    console.error(`Error writing sitemap to ${sitemapPath}:`, error);
  }
}

const writeRobots = async () => {
  let robotsContent = `User-agent: *\nDisallow:\n`;
  if (typeof process.env.ALLOW_ROBOTS === 'undefined') {
    robotsContent = `User-agent: *\nDisallow: /\n`;
  }
  if (process.env.BUILD_ENV === 'production') {
    robotsContent += `Sitemap: ${SITEMAP_DOMAIN}/sitemap.xml\n`;
  }

  const robotsPath = './client/www/next-build/robots.txt';
  try {
    await fs.writeFile(robotsPath, robotsContent);
    console.log(`robots.txt written to ${robotsPath}`);
  } catch (error) {
    console.error(`Error writing robots.txt to ${robotsPath}:`, error);
  }
};

generateSitemap();
writeRobots();
