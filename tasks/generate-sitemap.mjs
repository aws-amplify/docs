import { promises as fs } from 'fs';
import { execSync } from 'child_process';
import crypto from 'node:crypto';
import * as cheerio from 'cheerio';
import dotenv from 'dotenv';
import flatDirectory from '../src/directory/flatDirectory.json' assert { type: 'json' };

dotenv.config({ path: './.env.custom' });

const SITEMAP_DOMAIN = process.env.SITEMAP_DOMAIN
  ? process.env.SITEMAP_DOMAIN
  : 'https://docs.amplify.aws';

// Path of the Next.js static HTML build output
const ROOT_PATH = './client/www/next-build';

const formatDate = (date) => date.toISOString();
const getPriority = () => 0.5;

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
export const xmlUrlNode = (htmlPageData, domain = SITEMAP_DOMAIN) => {
  const urlPath = htmlPageData[0];

  const lastmod = htmlPageData[1]
    ? formatDate(new Date(htmlPageData[1]))
    : formatDate(new Date());
  const loc = `${domain}${urlPath}`;
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
 * Helper function to replace the platform specific subpath of the href argument with the string '[platform]'.
 * @param {string} href The platform specific string to be replaced with [platform]. (e.g. /android/build-a-backend/auth/sign-in)
 * @returns String with the platform subpath replaced with '[platform]', if a specific platform is found
 */
function replacePlatformHref(href) {
  const platformRegex = new RegExp(`\/(${PLATFORMS.join('|')})\/`);

  return href.replace(platformRegex, '/[platform]/');
}

/**
 * Process the HTML file to hash the content from the main element.
 * @param {string} htmlFilePath File path of the HTML to process
 * @returns {string} The Hash value of the of the main content from HTML file
 */
async function getHashofHtmlFile(htmlFilePath) {
  try {
    if (htmlFilePath && htmlFilePath.length > 0) {
      const htmlContent = await fs.readFile(htmlFilePath, 'utf-8');

      const $ = cheerio.load(htmlContent);

      // Remove elements to help compare the pages
      $('.breadcrumb__container').remove();
      $('img').remove();
      $('.next-prev').remove();

      const mainContent = $('main').text();

      // Hash the main content to help find duplicate content.
      return crypto.createHash('sha256').update(mainContent).digest('hex');
    }
  } catch (error) {
    console.error(`Error reading file ${htmlFilePath}:`, error);
  }
}

/**
 * Finds duplicate HTML files in a directory and groups them together in a Map
 * @param {string[]} htmlFiles List of strings representing the paths to all the HTML files in the directory
 * @returns {Map<string, string[]>} Group of duplicate html pages grouped by their hashed value
 */
async function groupDuplicateHtmlFiles(htmlFiles) {
  const hashes = new Map();

  for (let filePath of htmlFiles) {
    const hash = await getHashofHtmlFile(filePath);

    if (hash) {
      if (!hashes.has(hash)) {
        hashes.set(hash, [filePath]);
      } else {
        // If the content is the same, then it will create the same hash
        // Found duplicate, push the file onto the existing array
        hashes.get(hash).push(filePath);
      }
    }
  }

  return hashes;
}

/**
 * Finds the highest ranking page to be used in the sitemap as the canonical url
 * @param {string[]} pages Array of page names (e.g. ['/react/my/page', '/javascript/my/page', '/nextjs/my/page'])
 * @returns {string} The highest ranking page
 */
function findHighestRankPage(pages) {
  const PLATFORM_RANKINGS = {
    react: 1,
    javascript: 2,
    nextjs: 3,
    swift: 4,
    flutter: 5,
    'react-native': 6,
    android: 7,
    angular: 8,
    vue: 9
  };

  if (pages.length === 1) {
    return pages[0];
  }

  const sortedRanks = Object.entries(PLATFORM_RANKINGS).sort(
    (a, b) => a[1] - b[1]
  );

  // Look for the highest rank page starting from the highest rank to the lowest rank
  for (const [platform] of sortedRanks) {
    for (const page of pages) {
      const platformRegex = new RegExp(`\/${platform}\/`);
      if (platformRegex.test(page)) {
        return page;
      }
    }
  }
}

/**
 * Helper function to find the canonical page to use in the sitemap.xml file.
 * @param {string[]} pagePaths Array of page paths that were found to be duplicated pages (e.g. ['/react/my/page', '/javascript/my/page', '/nextjs/my/page'])
 * @returns {object} Object containing the canonical page and its directoryObject.
 * @returns {object} Object.directoryObject
 * @returns {string} Object.canonicalPageName
 */
export function findCanonicalPage(pagePaths) {
  const canonicalPage = findHighestRankPage(pagePaths);

  // After finding the canonical page, we need to check if it exists in our directory.
  // To do that we clean up / format the canonical page found so that we can use it in flatDirectory
  const canonicalPageName = canonicalPage
    .replace(ROOT_PATH, '')
    .replace('index.html', '');

  // Try to replace the specific platform from the page name so we can use it as a key
  const flatDirectoryKey = replacePlatformHref(canonicalPageName);

  // Remove the trailing slash since flatDirectory has keys without these slashes
  const keyWithoutTrailingSlash =
    flatDirectoryKey.length > 1 && flatDirectoryKey.endsWith('/')
      ? flatDirectoryKey.slice(0, -1)
      : flatDirectoryKey;

  const directoryObject = flatDirectory[keyWithoutTrailingSlash];

  return { directoryObject, canonicalPageName };
}

/**
 * Generates the sitemap from the HTML files created by the Next.js build with only the canonical urls
 */
export async function generateSitemap() {
  console.log('generating sitemap.xml file...');

  const htmlPages = findHtmlFiles(ROOT_PATH);
  const htmlFileMap = await groupDuplicateHtmlFiles(htmlPages);

  const canonicalPages = [...htmlFileMap].reduce(
    (accumulatedPages, currentHashedEntry) => {
      const pagePaths = currentHashedEntry[1];

      const { directoryObject, canonicalPageName } =
        findCanonicalPage(pagePaths);

      // We only want to add the page if it's in our directory
      if (directoryObject) {
        accumulatedPages.push([canonicalPageName, directoryObject.lastUpdated]);
      }

      return accumulatedPages;
    },
    []
  );

  let xmlUrlNodes = '';
  for (const page of canonicalPages) {
    xmlUrlNodes += await xmlUrlNode(page);
  }

  return `${xmlUrlWrapper(xmlUrlNodes)}`;
}

/**
 * Writes the sitemap to the sitemap.xml file in the build directory
 */
export async function writeSitemap() {
  const sitemapPath = `${ROOT_PATH}/sitemap.xml`;
  const sitemap = await generateSitemap();

  try {
    await fs.writeFile(sitemapPath, sitemap);
    console.log(`sitemap written to ${sitemapPath}`);
  } catch (error) {
    console.error(`Error writing sitemap to ${sitemapPath}:`, error);
  }
}

export const writeRobots = async () => {
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
