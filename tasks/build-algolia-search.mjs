import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import dotenv from 'dotenv';
import algoliasearch from 'algoliasearch/lite.js';
import directory from '../src/directory/directory.js';
import parseImports from 'parse-imports';
import extractMdxMeta from 'extract-mdx-metadata';
import { remark } from 'remark';
import mdx from 'remark-mdx';
import { compile } from '@mdx-js/mdx';

import { visit } from 'unist-util-visit';

const platformMap = {
  js: {
    label: 'JavaScript'
  },
  android: {
    label: 'Android'
  },
  ios: {
    label: 'iOS'
  },
  flutter: {
    label: 'Flutter'
  },
  react: {
    label: 'React'
  },
  'react-native': {
    label: 'React Native'
  },
  angular: {
    label: 'Angular'
  },
  vue: {
    label: 'Vue'
  },
  ionic: {
    label: 'Ionic'
  },
  next: {
    label: 'Next.js'
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const articles = [];
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

const pagesToSkip = ['/', '/ChooseFilterPage', '/404'];
const pagesWithIndex = ['/cli/function', '/cli', '/console'];

const pageValues = [];
Object.keys(pathmap).forEach(async (key) => {
  const value = pathmap[key];
  let { page, title, subcategory, category } = value;

  if (pagesToSkip.includes(page)) {
    return;
  }

  if (pagesWithIndex.includes(page)) {
    page += '/index';
  }

  const filename = path.join(__dirname, '../src/pages', page) + '.mdx';
  let platform = '';
  if (page.includes('[')) {
    platform = key.split('/').pop();
  }
  pageValues.push({ filename, platform, title, subcategory, category });
});

try {
  dotenv.config();

  if (!process.env.PUBLIC_ALGOLIA_APP_ID) {
    throw new Error('PUBLIC_ALGOLIA_APP_ID is not defined');
  }

  if (!process.env.ALGOLIA_SEARCH_ADMIN_KEY) {
    throw new Error('ALGOLIA_SEARCH_ADMIN_KEY is not defined');
  }

  console.log('Compiling index...');

  readPages(async function() {
    try {
      const transformed = transformPostsToSearchObjects(articles);
      const client = algoliasearch(
        process.env.PUBLIC_ALGOLIA_APP_ID,
        process.env.ALGOLIA_SEARCH_ADMIN_KEY
      );
      const index = client.initIndex('custom_search_staging');
      const cleared = await index.clearObjects();
      console.log('Index cleared:', cleared);

      const algoliaResponse = await index.saveObjects(transformed);
      console.log(
        `Successfully added ${algoliaResponse.objectIDs.length} records to Algolia search!`
      );
    } catch (error) {
      console.error(error);
    }
  });
} catch (error) {
  console.error(error);
  process.exit(1);
}

function readPages(cb) {
  if (!pageValues.length) {
    if (cb) cb();
    return;
  }
  const page = pageValues.pop();
  const { filename, platform, title, subcategory, category } = page;
  const doc = fs.readFileSync(filename, 'utf8');
  tryParseImports(doc, filename, platform, cb, title, subcategory, category);
}

async function tryParseImports(
  source,
  filename,
  platform,
  cb,
  title,
  subcategory,
  category
) {
  console.log('Compiling', filename);
  try {
    const compiled = String(await compile(source));
    const lines = source.split('\n');
    const imports = [...(await parseImports(compiled))];
    const fragments = {};
    lines.forEach((line, lineNumber) => {
      if (line.includes('<Fragments')) {
        allFilters.forEach((filter) => {
          if (line.includes(filter)) {
            if (!(filter in fragments)) {
              fragments[filter] = [];
            }
            imports.forEach((parsedImport) => {
              const isAbsolute = parsedImport.moduleSpecifier.isConstant;
              const hasDefault = parsedImport.importClause.default;
              const likelyFragment = isAbsolute && hasDefault;
              if (
                likelyFragment &&
                parsedImport.importClause.default.includes(filter)
              ) {
                fragments[filter].push(parsedImport.moduleSpecifier.value);
              }
            });
          }
        });
      }
    });

    // derive URL path
    filename = filename.split('[');
    filename[1] = platform;
    filename = filename.join('');
    filename = filename.split('src/pages')[1];
    filename = filename.split('.mdx')[0];

    if (!Object.keys(fragments).length === 0) {
      // add platform specific fragments to source
      fragments[platform].forEach((fragment) => {
        const fragmentPath = path.join(__dirname, '..', fragment);
        const fragmentFile = fs.readFileSync(fragmentPath, 'utf8');
        source = source + '\n' + fragmentFile;
      });

      // remove unused fragments and imports from markdown
      source = source.split('\n');
      source = source.map((line) => {
        if (line.includes('<Fragments') || line.includes('/src/fragments/')) {
          line = '';
        }
        return line;
      });

      source = source.join('\n');
    }

    const meta = await extractMdxMeta(source);

    meta.title = platformMap[platform]
      ? title + ' - ' + platformMap[platform].label
      : title;

    meta.description = platformMap[platform]
      ? meta.description + ' - ' + platformMap[platform].label
      : meta.description;

    meta.subcategory = subcategory;
    meta.category = category;

    const result = remark()
      .use(mdx)
      .use(makeSearchable)
      .processSync(source);

    const searchableText = result.data;

    articles.push({ searchableText, source, meta, filename });
    readPages(cb);
  } catch (e) {
    console.log('Pages remaing:', pageValues.length);
    console.error(`cannot parse ES imports in '${filename}'`);
    console.error(e);
    readPages(cb);
  }
}

function transformPostsToSearchObjects(articles) {
  const transformed = [];
  articles.forEach((article) => {
    const { searchableText } = article;
    searchableText.forEach((chunk, idx) => {
      console.log('slug', article.filename);
      let slug = article.filename;
      if (slug.endsWith('/index')) {
        slug = slug.split('/index')[0];
      }
      let category = article.meta.category; // slug.split('/')[1];
      let subcategory = article.meta.subcategory; // slug.split('/')[2];
      let text = chunk.text;
      let description = article.meta.description;
      const skip =
        subcategory === 'undefined' ||
        subcategory === undefined ||
        text.startsWith('Learn more about how to use Amplify Framework') ||
        description.length === 0 ||
        text.length === 0;
      if (!skip) {
        const obj = {
          objectID: article.meta.title + '-' + idx,
          title: article.meta.title,
          description,
          slug,
          category,
          subcategory,
          type: 'article',
          heading: chunk.heading,
          depth: chunk.depth,
          text
        };

        transformed.push(obj);
      }
    });
  });

  return transformed;
}

const textTypes = ['text', 'emphasis', 'strong', 'inlineCode'];
const flattenNode = (node) => {
  const p = [];
  visit(node, (node) => {
    if (!textTypes.includes(node.type)) return;
    p.push(node.value);
  });

  return p.join(``);
};

function makeSearchable() {
  return (tree, file) => {
    file.data = [];
    let heading = null;
    let depth = null;

    visit(
      tree,
      ({ type }) => {
        return ['heading', 'paragraph'].includes(type);
      },
      (node) => {
        if (node.type === 'heading') {
          heading = flattenNode(node);
          depth = node.depth;
          return;
        }

        file.data.push({
          heading,
          depth,
          text: flattenNode(node)
        });
      }
    );
  };
}

function titleCase(str) {
  if (str === 'cli') return 'CLI';
  if (str === 'uibuilder') return 'UI Builder';
  if (str === 'adminui') return 'Admin UI';
  if (str === 'graphql-transformer') return 'GraphQL Transformer';
  if (str === 'cli-legacy') return 'CLI Legacy';
  if (str === 'api-rest') return 'API (REST)';
  if (str === 'graphql') return 'GraphQL';
  let category = str.toLowerCase();
  let titleCaseCategory =
    category.charAt(0).toUpperCase() + category.substring(1, category.length);
  return titleCaseCategory;
}

// modifed version of '../generatePathMap.cjs.js'
var category = null;
function generatePathMap(obj, pathMap = {}, subcategory) {
  for (const [_, value] of Object.entries(obj)) {
    const { items, filters, route, productRoot, title } = value;

    if (productRoot) {
      category = productRoot.title;
      console.log(category);
    }

    if (items) {
      generatePathMap(items, pathMap, title);
    }

    if (!filters || !filters.length) {
      let page = '';
      const mdxSrc = `${route}.mdx`;
      const tsxSrc = `${route}.tsx`;

      const maybeMDXFile = './src/pages' + mdxSrc;
      const maybeTSXFile = './src/pages' + tsxSrc;

      if (fs.existsSync(maybeTSXFile)) {
        page = tsxSrc;
      } else if (fs.existsSync(maybeMDXFile)) {
        page = mdxSrc;
      }

      if (page.length) {
        pathMap[route] = {
          page: route,
          subcategory,
          category,
          title
        };
      }

      continue;
    }

    let page = '';
    let routeType = '';
    ['platform', 'framework', 'integration'].forEach((type) => {
      const src = `${route}/q/${type}/[${type}].mdx`;
      const maybeFile = './src/pages' + src;
      if (fs.existsSync(maybeFile)) {
        page = src;
        routeType = type;
      }
    });

    if (!page || !routeType) {
      continue;
    }

    filters.forEach((filter) => {
      pathMap[route + '/q/' + routeType + '/' + filter] = {
        page: `${route}/q/${routeType}/[${routeType}]`,
        subcategory,
        category,
        title
      };
    });
  }
  console.log(pathMap);
  return pathMap;
}
