const fs = require('fs').promises;
const matter = require('gray-matter');

// Node script run by lint-staged to update the "lastUpdated" date for mdx files
const updateLastUpdatedFrontmatter = async () => {
  const [, , ...mdFilePaths] = process.argv;

  mdFilePaths.forEach(async (path) => {
    const file = matter.read(path);
    const { data: currentFrontmatter } = file;

    const updatedFrontmatter = {
      ...currentFrontmatter,
      lastUpdated: new Date().toISOString()
    };

    console.log('updatedfrontmatter is ', updatedFrontmatter);

    file.data = updatedFrontmatter;
    const updatedFileContent = matter.stringify(file);
    fs.writeFile(path, updatedFileContent);
  });
};

updateLastUpdatedFrontmatter();
