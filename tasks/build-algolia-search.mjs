import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import dotenv from 'dotenv';
// import algoliasearch from 'algoliasearch/lite';
import directory from '../src/directory/directory.js';
import generatePathMap from '../generatePathMap.cjs.js';
import parseImports from 'parse-imports';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

try {
  dotenv.config();

  if (!process.env.PUBLIC_ALGOLIA_APP_ID) {
    throw new Error('PUBLIC_ALGOLIA_APP_ID is not defined');
  }

  if (!process.env.ALGOLIA_SEARCH_ADMIN_KEY) {
    throw new Error('ALGOLIA_SEARCH_ADMIN_KEY is not defined');
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}

const pathmap = generatePathMap(directory);
const allFilters = [
  'js',
  'android',
  'ios',
  'flutter',
  'react',
  'react-native',
  'angular',
  'vue',
  'ionic',
  'next'
];

const pageValues = [];
Object.keys(pathmap).forEach(async (key) => {
  const value = pathmap[key];
  const { page } = value;
  if (page.includes('[')) {
    console.log(key, page);
    const platform = key.split('/').pop();
    console.log(platform);
    const filename = path.join(__dirname, '../src/pages', page) + '.mdx';

    pageValues.push({ filename, platform });
  }
});

function readPages() {
  if (!pageValues.length) return;
  const page = pageValues.pop();
  const { filename, platform } = page;
  const doc = fs.readFileSync(filename, 'utf8');
  tryParseImports(doc, filename);
}
readPages();

async function tryParseImports(source, filename = '') {
  try {
    const imports = [...(await parseImports(source))];
    const lines = source.split('\n');
    const fragments = {};
    lines.forEach((line, lineNumber) => {
      if (line.includes('<Fragments')) {
        allFilters.forEach((filter) => {
          if (line.includes(filter)) {
            if (!(filter in fragments)) {
              fragments[filter] = [];
            }
            imports.forEach((parsedImport) => {
              if (parsedImport.importClause.default.includes(filter)) {
                fragments[filter].push(parsedImport.moduleSpecifier.value);
              }
            });
          }
        });
      }
    });
    console.log(fragments);
    readPages();
  } catch (e) {
    console.log('Pages remaing:', pageValues.length);
    console.error(`cannot parse ES imports in '${filename}'`);
    readPages();
  }
}

// const CONTENT_PATH = path.join(process.cwd(), 'content/articles');
// const contentFilePaths = fs
//   .readdirSync(CONTENT_PATH)
//   // Only include md(x) files
//   .filter((path) => /\.mdx?$/.test(path));

// async function getAllBlogPosts() {
//   const articles = contentFilePaths.map((filePath) => {
//     const source = fs.readFileSync(path.join(CONTENT_PATH, filePath));
//     const { content, data } = matter(source);

//     return {
//       content, // this is the .mdx content
//       data, // this is the frontmatter
//       filePath // this is the file path
//     };
//   });

//   return articles;
// }
