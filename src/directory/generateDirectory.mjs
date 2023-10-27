import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { cwd } from 'node:process';
import path from 'path';
import JSON5 from 'json5';
import { directory } from './directory.mjs';
import { writeFile } from 'fs/promises';

/**
 * Helper function to use RegEx to grab the "meta" object
 * @param {string} filePath
 * @returns
 */
async function getMetaStringObj(filePath) {
  const regex = /const\s+meta\s*=\s*(\{[^}]+\})/;

  const file = await fs.readFile(filePath, 'utf-8');

  const match = file.match(regex);

  if (match && match[1]) {
    try {
      // Using JSON5 because the meta object is a "relaxed" JSON
      // JSON5 can parse the meta object without needing quotes around the object keys
      const result = JSON5.parse(match[1]);

      return result;
    } catch (err) {
      throw new Error(
        `Unable to parse meta object for file: "${filePath}". ${err}`
      );
    }
  }
}
const rootPath = path.resolve(cwd(), 'src/pages');

/**
 * Traverses the directoryNode parameter and updates itself with properties
 * found from the files
 * @param {import('./directory').PageNode} directoryNode
 */
async function traverseDirectoryObject(directoryNode) {
  if (directoryNode) {
    if (directoryNode.isExternal) {
      // no op
    } else if (directoryNode.path) {
      const metaObj = await getMetaStringObj(directoryNode.path);

      if (metaObj) {
        for (const key of Object.keys(metaObj)) {
          directoryNode[key] = metaObj[key];
        }

        const relativePath = path.relative(rootPath, directoryNode.path);
        const parsedPath = path.parse(relativePath);

        if (parsedPath.name === 'index') {
          // For 'index' files we only want to display their directory name as the path
          directoryNode['route'] = path.join('/', parsedPath.dir);
        } else {
          directoryNode['route'] = path.join(
            '/',
            parsedPath.dir,
            parsedPath.name
          );
        }
      }
    }

    if (directoryNode.children) {
      for (const child of directoryNode.children) {
        await traverseDirectoryObject(child);
      }
    }
  }
}

async function generateDirectory() {
  const directoryCopy = { ...directory };

  await traverseDirectoryObject(directoryCopy);

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'directory.json');

    const json = JSON.stringify(directoryCopy, null, 2);

    await writeFile(filePath, json, 'utf-8');

    console.log('Directory object has been written to', filePath);
  } catch (err) {
    throw new Error(`Error saving to directory.json: ${err}`);
  }
}

console.log('Generating directory.json...');
generateDirectory();
