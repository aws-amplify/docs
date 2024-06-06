import { readFileSync } from 'fs';
import { load } from 'cheerio';

const urlList = [];

const siteMap = readFileSync('client/www/next-build/sitemap.xml');

const siteMapParse = load(siteMap, {
  xml: true
});

siteMapParse('url').each(function () {
  const url = siteMapParse(this).find('loc').text();
  if (!url.includes('gen1')) {
    urlList.push(url);
  }
});

console.log('Gen 2 pages in sitemap: ', urlList.length);
