import { promises as fs } from 'fs';
import matter from 'gray-matter';
import { getLastModifiedDate } from 'git-jiggy';
import glob from 'tiny-glob';

// Node script to go through each mdx file and add frontmatter with a "lastUpdated" property from git commit history
const addLastUpdatedDates = async () => {
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

addLastUpdatedDates();
