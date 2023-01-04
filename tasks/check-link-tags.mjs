import fs from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const removeCodeBlocks = (source) => {
  //A Tags are allowed in both code blocks and code snippets because these are not rendered as links
  const removeCodeBlocks = /```[\s\S]+?(?=```)```/gm;
  const removeCode = /`[\s\S]+?(?=`)`/gm;
  source = source.replace(removeCodeBlocks, '');
  source = source.replace(removeCode, '');
  return source;
};

const containsATag = (source) => {
  //Does a simple regex test looking for an <a> tag
  const removeLink = /<a [^>]+>/gm;
  return removeLink.test(source);
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
let files = [];

function getAllMdxFiles(directory) {
  //recursively add all mdx files found in the directory to the files list
  fs.readdirSync(directory).forEach((file) => {
    const absolute = path.join(directory, file);
    if (fs.statSync(absolute).isDirectory()) return getAllMdxFiles(absolute);
    else if (absolute.includes('.mdx')) return files.push(absolute);
  });
}

getAllMdxFiles(`${__dirname}/../src/pages`);
getAllMdxFiles(`${__dirname}/../src/fragments`);

const errors = [];
files.forEach((filename) => {
  //check each mdx file found for A tags
  const doc = removeCodeBlocks(fs.readFileSync(filename, 'utf8'));
  if (containsATag(doc)) {
    errors.push(`A Tag found in ${filename}`);
  }
});

if (errors.length) {
  //If any A tags were found throw an error
  throw new Error(errors);
}
