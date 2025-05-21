import { promises as fs } from 'fs';
import JSON5 from 'json5';

const invalidMetaError = (
  filePath,
  err
) => `Unable to parse meta object for file: "${filePath}". ${err}
        
Please check the "meta" object for file "${filePath}" and make sure the javascript object is a valid javascript object.
There might be a missing comma in the object or a missing semicolon at the end of the meta object.
        `;

const missingMetaError = (filePath) =>
  `File "${filePath}" was listed in directory.mjs, but generateDirectory.mjs could not parse the meta object.
    Please check the "meta" object in the file and make sure it is a valid javascript object.
    There might be a missing comma in the object or a missing semicolon at the end of the meta object.`;

/**
 * Helper function to use RegEx to grab the "meta" object
 * @param {string} filePath
 * @returns
 */

export async function getMetaStringObj(filePath) {
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
      throw new Error(invalidMetaError(filePath, err));
    }
  } else {
    // This error is for when we don't find a match for the meta object in the file at all.
    throw new Error(missingMetaError(filePath));
  }
}
