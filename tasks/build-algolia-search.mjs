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

try {
  dotenv.config();

  if (!process.env.PUBLIC_ALGOLIA_APP_ID) {
    throw new Error('PUBLIC_ALGOLIA_APP_ID is not defined');
  }

  if (!process.env.ALGOLIA_SEARCH_ADMIN_KEY) {
    throw new Error('ALGOLIA_SEARCH_ADMIN_KEY is not defined');
  }

  readPages(async function() {
    const transformed = transformPostsToSearchObjects(articles);
    console.log(transformed);
    const client = algoliasearch(
      process.env.PUBLIC_ALGOLIA_APP_ID,
      process.env.ALGOLIA_SEARCH_ADMIN_KEY
    );
    const index = client.initIndex('custom_search_staging');
    const algoliaResponse = await index.saveObjects(transformed);

    console.log(
      `Successfully added ${
        algoliaResponse.objectIDs.length
      } records to Algolia search! Object IDs:\n${algoliaResponse.objectIDs.join(
        '\n'
      )}`
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
    // console.log(fragments, filename, platform);

    // derive URL path
    filename = filename.split('[');
    filename[1] = platform;
    filename = filename.join('');
    filename = filename.split('src/pages')[1];

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

    const meta = await extractMdxMeta(source);

    meta.title = platformMap[platform]
      ? meta.title + ' - ' + platformMap[platform].label
      : meta.title;

    meta.description = platformMap[platform]
      ? meta.description + ' - ' + platformMap[platform].label
      : meta.description;

    const result = remark()
      .use(mdx)
      .use(searchable)
      .processSync(source);

    const searchableText = result.data;

    articles.push({ searchableText, source, meta });
    readPages(cb);
  } catch (e) {
    console.log('Pages remaing:', pageValues.length);
    console.error(`cannot parse ES imports in '${filename}'`);
    readPages(cb);
  }
}

function transformPostsToSearchObjects(articles) {
  const transformed = articles.map((article) => {
    return {
      objectID: article.meta.title,
      title: article.meta.title,
      description: article.meta.description,
      slug: article.filename,
      type: 'article',
      content: article.searchableText
    };
  });

  return transformed;
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
