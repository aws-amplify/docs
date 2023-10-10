import directory from './src/directory/directory.mjs';
import fs from 'fs';

console.log(directory);

const values = Object.values(directory);
values.forEach((dirRoot) => {
  const productRoot = dirRoot.productRoot;
  let route = productRoot.route;
  const filePath = `./src/pages${route}/index.mdx`;
  if (fs.existsSync(filePath)) {
    console.log(`index file exists for ${productRoot.title}`);
  } else {
    console.log(`index file does not extist for ${filePath}`);
  }
});
