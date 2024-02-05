// Adapted from https://gist.github.com/joranquinten/78f3e288274a3c9405a499b8a8c46e35
import * as fs from 'fs';
import { execSync } from 'child_process';
import directory from '../src/directory/directory.json' assert { type: 'json' };

const formatDate = (date) => `${date.toISOString().split('.')[0]}+0:00`;
const getPriority = () => 0.5;

const lastModifiedCache = {};
const lastModified = (path) => {
  if (fs.existsSync(path)) {
    if (path in lastModifiedCache) {
      return lastModifiedCache[path];
    }
    return (lastModifiedCache[path] = execSync(
      `git log -1 --pretty="format:%cI" ${path}`
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

const domain = 'https://docs.amplify.aws';
const xmlUrlNode = (pageUrl, pagePath) => {
  const lastmod = lastModified(pagePath);
  const url = `${pageUrl}${pageUrl === '/' ? '' : '/'}`;
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

const traverseDirectory = (directory, cb) => {
  let retValue = [];
  const children = directory.children;
  retValue = retValue.concat(cb(directory));
  children?.forEach((child) => {
    retValue = retValue.concat(traverseDirectory(child, cb));
  });
  return retValue;
};

const getFilePath = (filePaths) => {
  for (let i = 0; i < filePaths.length; i++) {
    if (fs.existsSync(filePaths[i])) {
      return filePaths[i];
    }
  }
  return '';
};

const createRoutePathList = (directory) => {
  const getRouteAndPath = (directoryNode) => {
    if (directoryNode.isExternal) return [];
    const route = directoryNode.route;
    const filePath = getFilePath([
      `src/pages${route}.mdx`,
      `src/pages${route}.tsx`,
      `src/pages${route}/index.mdx`,
      `src/pages${route}/index.tsx`
    ]);
    if (!route) {
      return;
    }
    if (route.includes('[platform]') && directoryNode.platforms?.length) {
      return directoryNode.platforms.map((platform) => {
        return { route: route.replace('[platform]', platform), filePath };
      });
    } else {
      return [{ route, filePath }];
    }
  };
  const routePathList = traverseDirectory(directory, getRouteAndPath);

  return routePathList;
};

const writeSitemap = async () => {
  const sitemapPath = './public/sitemap.xml';
  const pathMap = createRoutePathList(directory);
  let xmlUrlNodes = '';
  pathMap.forEach((routePath) => {
    if (!routePath) return;
    const { route, filePath } = routePath;
    xmlUrlNodes += xmlUrlNode(route, filePath);
  });
  const sitemap = `${xmlUrlWrapper(xmlUrlNodes)}`;
  fs.writeFileSync(sitemapPath, sitemap);
  console.log(`sitemap written to ${sitemapPath}`);
};

const writeRobots = () => {
  let robotsContent = `User-agent: *\nDisallow:\n`;
  if (typeof process.env.ALLOW_ROBOTS === 'undefined') {
    robotsContent = `User-agent: *\nDisallow: /\n`;
  }
  if (process.env.BUILD_ENV === 'production') {
    robotsContent += `Sitemap: ${domain}/sitemap.xml\n`;
  }

  const robotsPath = './public/robots.txt';
  fs.writeFileSync(robotsPath, robotsContent);
  console.log(`robots.txt written to ${robotsPath}`);
};

writeSitemap();
writeRobots();
