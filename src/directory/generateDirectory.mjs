import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { cwd } from 'node:process';
import path from 'path';
import JSON5 from 'json5';
import { directory } from './directory.mjs';
import { writeFile } from 'fs/promises';
import { getLastModifiedDate } from 'git-jiggy';

// Set up the root path so that we can get the correct path from the current working directory
const rootPath = path.resolve(cwd(), 'src/pages');

/**
 * Helper function to use RegEx to grab the "meta" object
 * @param {string} filePath
 * @returns
 */
async function getMetaStringObj(filePath) {
  const regex = /const\s+meta\s*=\s*(\{[\s\S]*?\n\};)/;

  const file = await fs.readFile(filePath, 'utf-8');

  const match = file.match(regex);

  if (match && match[1]) {
    try {
      // Using JSON5 because the meta object is a "relaxed" JSON
      // JSON5 can parse the meta object without needing quotes around the object keys
      let metaObj = match[1].replaceAll('`', "'").replaceAll(';', '');
      const result = JSON5.parse(metaObj);

      return result;
    } catch (err) {
      // This error is for when we found a match, but did not match the correct meta object.
      // This case happens when we have another exported variable below the meta object.
      throw new Error(
        `Unable to parse meta object for file: "${filePath}". ${err}
        
Please check the "meta" object for file "${filePath}" and make sure the javascript object is a valid javascript object.
There might be a missing comma in the object or a missing semicolon at the end of the meta object.
        `
      );
    }
  } else {
    // This error is for when we don't find a match for the meta object in the file at all.
    throw new Error(
      `File "${filePath}" was listed in directory.mjs, but generateDirectory.mjs could not parse the meta object.
Please check the "meta" object in the file and make sure it is a valid javascript object.
There might be a missing comma in the object or a missing semicolon at the end of the meta object.
`
    );
  }
}

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

        // Get the last updated date
        try {
          directoryNode['lastUpdated'] = await getLastModifiedDate(
            directoryNode.path
          );
        } catch (error) {
          console.log(
            `error getting last modified date for ${directoryNode.path}`
          );
        }

        // Relative file path from the `src/pages` directory
        // This helps us create the paths like "/[platform]/..." and "/gen2/..."
        const relativePath = path.relative(rootPath, directoryNode.path);

        // Convert the relative path, that could be POSIX or Windows,
        // into a POSIX path that contains forward slashes for the path separator.
        // This is so we can let the default paths correctly find the file paths and then
        // use the forward slashes to help set up the route for Next.js
        const posixRelativePath = path.posix.join(
          ...relativePath.split(path.sep)
        );

        const parsedPath = path.posix.parse(posixRelativePath);

        // Set up the `route` property which is what we will use to link everything in Next.js
        // Use `path.posix.join` to use only forward slashes
        if (parsedPath.name === 'index') {
          // For 'index' files we only want to display their directory name as the path
          directoryNode['route'] = path.posix.join('/', parsedPath.dir);
        } else {
          directoryNode['route'] = path.posix.join(
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
