import directory from './src/directory/directory.mjs';
import fs from 'fs';
// import generatePathMap from './generatePathMap.cjs.js';

const values = Object.values(directory);
values.forEach((dirRoot) => {
  const productRoot = dirRoot.productRoot;
  let route = productRoot.route;
  const filePath = `./src/pages${route}/index.mdx`;
  const secondaryPath = `./src/pages${route}/index.tsx`;
  if (fs.existsSync(filePath) || fs.existsSync(secondaryPath)) {
    console.log(`index file exists for ${productRoot.title}`);
  } else {
    console.log(`index file does not extist for ${filePath}`);
  }
});

// let directoryPages = generatePathMap(directory);
// console.log(directoryPages);
// console.log(
//   Object.values(directoryPages).filter((d) =>
//     d.page.startsWith('/lib/project-setup/prereq')
//   )
// );
// console.log(
//   Object.keys(directoryPages).filter((d) =>
//     d.startsWith('/lib/project-setup/prereq')
//   )
// );
