const fs = require('fs').promises;
const matter = require('gray-matter');
const { getLastModifiedDate } = require('git-jiggy');
const glob = require('tiny-glob');

// Node script to go through each mdx file and add frontmatter with a "lastUpdated" property from git commit history
const addLastUpdatedToMdxFiles = async () => {
  const filepaths = await glob('./src/**/*.mdx');

  filepaths.forEach(async (filepath) => {
    const date = await getLastModifiedDate(filepath);
    console.log(filepath, date);

    const file = matter.read(filepath);
    const { data: currentFrontmatter } = file;

    const updatedFrontmatter = {
      ...currentFrontmatter,
      lastUpdated: date
    };

    file.data = updatedFrontmatter;

    const updatedFileContent = matter.stringify(file);

    fs.writeFile(filepath, updatedFileContent);
  });
};

addLastUpdatedToMdxFiles();
