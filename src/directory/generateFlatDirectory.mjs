import { fileURLToPath } from 'url';
import path from 'path';
import { writeFile } from 'fs/promises';
import directory from './directory.json' assert { type: 'json' };

function flattenJSON(jsonObj, flattened = {}) {
  if (Array.isArray(jsonObj.children)) {
    jsonObj.children.forEach((child) => flattenJSON(child, flattened));
  }
  if (jsonObj.route) {
    flattened[jsonObj.route] = { ...jsonObj };
    // Remove the 'children' property since we don't need it in the "flat" structure
    delete flattened[jsonObj.route].children;
  }
  return flattened;
}

/**
 * Generate a "flat" version of directory.json
 */
async function generateFlatDirectory() {
  const flatDirectory = flattenJSON(directory);

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const filePath = path.join(__dirname, 'flatDirectory.json');

    const json = JSON.stringify(flatDirectory, null, 2);

    await writeFile(filePath, json, 'utf-8');

    console.log('Directory object has been written to', filePath);
  } catch (err) {
    throw new Error(`Error saving to flatDirectory.json: ${err}`);
  }
}

console.log('Generating flatDirectory.json...');
generateFlatDirectory();
