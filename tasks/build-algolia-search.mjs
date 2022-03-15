import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import dotenv from 'dotenv';
import algoliasearch from 'algoliasearch/lite.js';
import directory from '../src/directory/directory.js';
import generatePathMap from '../generatePathMap.cjs.js';
import parseImports from 'parse-imports';
import extractMdxMeta from 'extract-mdx-metadata';
import { remark } from 'remark';
import mdx from 'remark-mdx';
import searchable from 'remark-mdx-searchable';
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
  let { page } = value;

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
  pageValues.push({ filename, platform });
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
    const transformed = transformPostsToSearchObjects(articles);
    const client = algoliasearch(
      process.env.PUBLIC_ALGOLIA_APP_ID,
      process.env.ALGOLIA_SEARCH_ADMIN_KEY
    );
    const index = client.initIndex('custom_search_staging');
    const algoliaResponse = await index.saveObjects(transformed);

    console.log(
      `Successfully added ${algoliaResponse.objectIDs.length} records to Algolia search!`
    );
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
  const { filename, platform } = page;
  const doc = fs.readFileSync(filename, 'utf8');
  tryParseImports(doc, filename, platform, cb);
}

async function tryParseImports(source, filename, platform, cb) {
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
      ? meta.title + ' - ' + platformMap[platform].label
      : meta.title;

    meta.description = platformMap[platform]
      ? meta.description + ' - ' + platformMap[platform].label
      : meta.description;

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
      const obj = {
        objectID: article.meta.title + '-' + idx,
        title: article.meta.title,
        description: article.meta.description,
        slug: article.filename,
        type: 'article',
        content: {
          heading: chunk.heading,
          depth: chunk.depth,
          text: chunk.text
        }
      };

      transformed.push(obj);
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
