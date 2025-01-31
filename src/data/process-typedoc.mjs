import { writeFileSync } from 'fs';

export const processReferences = (references, rootPackage) => {
  // build flat object for easier faster lookups
  const flatReferences = {};

  const recursivelyPopulateFlatObject = (referenceObject) => {
    if (!referenceObject) return;
    if (referenceObject['id']) {
      const copy = recursivelyStripObject(structuredClone(referenceObject));
      flatReferences[referenceObject['id']] = copy;
    }

    for (let key in referenceObject) {
      if (referenceObject.hasOwnProperty(key)) {
        if (Array.isArray(referenceObject[key])) {
          referenceObject[key].forEach((child) => {
            recursivelyPopulateFlatObject(child);
          });
        } else if (
          typeof referenceObject[key] === 'object' &&
          referenceObject[key] !== null
        ) {
          recursivelyPopulateFlatObject(referenceObject[key]);
        }
      }
    }
  };

  const recursivelyStripObject = (referenceObject) => {
    for (let key in referenceObject) {
      if (referenceObject.hasOwnProperty(key)) {
        if (Array.isArray(referenceObject[key])) {
          referenceObject[key] = referenceObject[key].map((child) => {
            return child.id || child;
          });
        } else if (
          typeof referenceObject[key] === 'object' &&
          referenceObject[key] !== null
        ) {
          recursivelyStripObject(referenceObject[key]);
        }
      }
    }
    return referenceObject;
  };

  const isFunctionObject = (obj) => {
    return obj.kind === 64 && obj.variant === 'declaration';
  };
  recursivelyPopulateFlatObject(references);

  const rootId = Object.keys(flatReferences).find(
    (id) => flatReferences[id].name == rootPackage
  );

  flatReferences['categories'] = flatReferences[rootId].children.map(
    (catId) => {
      const cat = structuredClone(flatReferences[catId]);
      if (cat.children && Array.isArray(cat.children)) {
        cat.children = cat.children
          .map((childId) => flatReferences[childId])
          .filter((child) => {
            return isFunctionObject(child);
          });
      }
      return cat;
    }
  );

  try {
    writeFileSync(
      './parsedJson.json',
      JSON.stringify(flatReferences, null, 2),
      'utf8'
    );
    console.log('Successfully saved parsed API information');
  } catch (error) {
    console.log('An error has occurred ', error);
  }

  return flatReferences;
};
