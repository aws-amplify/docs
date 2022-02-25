const dotenv = require('dotenv');
const algoliasearch = require('algoliasearch/lite');

try {
  dotenv.config();

  if (!process.env.PUBLIC_ALGOLIA_APP_ID) {
    throw new Error('PUBLIC_ALGOLIA_APP_ID is not defined');
  }

  if (!process.env.ALGOLIA_SEARCH_ADMIN_KEY) {
    throw new Error('ALGOLIA_SEARCH_ADMIN_KEY is not defined');
  }

  const CONTENT_PATH = path.join(process.cwd(), 'content/articles');
  const contentFilePaths = fs
    .readdirSync(CONTENT_PATH)
    // Only include md(x) files
    .filter((path) => /\.mdx?$/.test(path));

  async function getAllBlogPosts() {
    const articles = contentFilePaths.map((filePath) => {
      const source = fs.readFileSync(path.join(CONTENT_PATH, filePath));
      const { content, data } = matter(source);

      return {
        content, // this is the .mdx content
        data, // this is the frontmatter
        filePath // this is the file path
      };
    });

    return articles;
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}

console.log('It works!');
