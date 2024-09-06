import references from '../src/references/raw-references.json' assert { type: 'json' };
import { writeFileSync } from 'fs';
import {
  API_CATEGORIES,
  API_SUB_CATEGORIES
} from '../src/data/api-categories.mjs';

const cleanReferences = {};
const categoryNodes = [];

const categories = Object.values(API_CATEGORIES).concat(
  Object.values(API_SUB_CATEGORIES)
);

function recursivelyPopulateNodes(node) {
  if (!node) return;
  if (node.id) {
    if (cleanReferences.hasOwnProperty(node.id)) return;
    cleanReferences[node.id] = node;
  }
  if (node.target && typeof node.target === 'number') {
    recursivelyPopulateNodes(references[node.target]);
  }
  if (node.type) {
    if (typeof node.type === 'number') {
      const nextNode = references[node.type];
      recursivelyPopulateNodes(nextNode);
    } else if (typeof node.type === 'object') {
      recursivelyPopulateNodes(node.type);
    }
  }
  if (node.typeArguments && Array.isArray(node.typeArguments)) {
    node.typeArguments.forEach((arg) => {
      if (typeof arg === 'number') {
        recursivelyPopulateNodes(references[arg]);
      } else if (typeof arg === 'object' && arg !== null) {
        recursivelyPopulateNodes(arg);
      }
    });
  }
  if (node.types && Array.isArray(node.types)) {
    node.types.forEach((arg) => {
      if (typeof arg === 'number') {
        recursivelyPopulateNodes(references[arg]);
      } else if (typeof arg === 'object' && arg !== null) {
        recursivelyPopulateNodes(arg);
      }
    });
  }
  if (
    node.declaration &&
    node.declaration.children &&
    Array.isArray(node.declaration.children)
  ) {
    node.declaration.children.forEach((arg) => {
      if (typeof arg === 'number') {
        recursivelyPopulateNodes(references[arg]);
      } else if (typeof arg === 'object' && arg !== null) {
        recursivelyPopulateNodes(arg);
      }
    });
  }
  if (node.elementType && node.elementType.target) {
    const elemType = node.elementType.target;
    if (typeof elemType === 'number') {
      recursivelyPopulateNodes(references[elemType]);
    } else if (typeof elemType === 'object' && elemType !== null) {
      recursivelyPopulateNodes(elemType);
    }
  }
  if (node.children && Array.isArray(node.children)) {
    node.children.forEach((arg) => {
      if (typeof arg === 'number') {
        recursivelyPopulateNodes(references[arg]);
      } else if (typeof arg === 'object' && arg !== null) {
        recursivelyPopulateNodes(arg);
      }
    });
  }
  if (node.signatures && Array.isArray(node.signatures)) {
    node.signatures.forEach((arg) => {
      if (typeof arg === 'number') {
        recursivelyPopulateNodes(references[arg]);
      } else if (typeof arg === 'object' && arg !== null) {
        recursivelyPopulateNodes(arg);
      }
    });
  }
  if (node.parameters && Array.isArray(node.parameters)) {
    node.parameters.forEach((arg) => {
      if (typeof arg === 'number') {
        recursivelyPopulateNodes(references[arg]);
      } else if (typeof arg === 'object' && arg !== null) {
        recursivelyPopulateNodes(arg);
      }
    });
  }

  /**
   * Ids to look for and populate are
   * target
   * typeArguments[]
   * types[]
   * declaration->children[]
   * elementType -> target
   * children[]
   * signatures[]
   * parameters[]
   */
}

categories.forEach((catName) => {
  const catNode = references.categories.filter((cat) => {
    return cat.name === catName;
  })[0];

  if (catNode) {
    categoryNodes.push(catNode);
    recursivelyPopulateNodes(catNode);
  }
});

cleanReferences['categories'] = categoryNodes;

try {
  writeFileSync(
    'src/references/references.json',
    JSON.stringify(cleanReferences, null, 2),
    'utf8'
  );
  console.log('Data successfully saved to disk');
} catch (error) {
  console.log('An error has occurred ', error);
}
