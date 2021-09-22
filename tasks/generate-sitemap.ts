// Adapted from https://gist.github.com/joranquinten/78f3e288274a3c9405a499b8a8c46e35

import * as fs from "fs-extra";
import {execSync} from "child_process";
import directory from "../src/directory/directory";
const generatePathMap = require("../generatePathMap.cjs");

const formatDate = (date) => `${date.toISOString().split(".")[0]}+0:00`;
const getPriority = (_) => 0.5;

const lastModifiedCache = {};
const lastModified = (path) => {
  if (path == "/ChooseFilterPage") {
    path = `./src/pages${path}.tsx`;
  } else if (path == "/") {
    path = `./src/pages/index.tsx`;
  } else if (path == "/404") {
    path = `./src/pages/404.tsx`;
  } else if (path == "/console") {
    path = `./src/pages/console/index.mdx`;
  } else if (path == "/cli") {
    path = `./src/pages/cli/index.mdx`;
  } else if (path == "/cli/function") {
    path = `./src/pages/cli/function/index.mdx`;
  } else {
    path = `./src/pages${path}.mdx`;
  }
  if (fs.existsSync(path)) {
    if (path in lastModifiedCache) {
      return lastModifiedCache[path];
    }
    return (lastModifiedCache[path] = execSync(
      `git log -1 --pretty="format:%cI" ${path}`,
    ));
  }
  console.log(`${path} doesn't exist`);
  return formatDate(new Date());
};

const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">`;
const xmlUrlWrapper = (nodes) => `${xmlHeader}
  ${nodes}
</urlset>`;

const domain = "https://docs.amplify.aws";
const xmlUrlNode = (pageUrl, pagePath) => {
  const lastmod = lastModified(pagePath);
  const url = `${pageUrl}${pageUrl === "/" ? "" : "/"}`;
  const loc = `${domain}${url}`;
  const priority = getPriority(url);
  return `
<url>
  <loc>${loc}</loc>
  <lastmod>${lastmod}</lastmod>
  <changefreq>hourly</changefreq>
  <priority>${priority}</priority>
</url>`;
};

const writeSitemap = () => {
  const sitemapPath = "./public/sitemap.xml";
  const pathmap = generatePathMap(directory);
  let xmlUrlNodes = "";
  for (const pageUrl in pathmap) {
    const pagePath = pathmap[pageUrl].page;
    xmlUrlNodes += xmlUrlNode(pageUrl, pagePath);
  }
  const sitemap = `${xmlUrlWrapper(xmlUrlNodes)}`;
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`sitemap written to ${sitemapPath}`);
};

writeSitemap();
