import directory from './src/directory/directory.mjs';
import fs from 'fs';
// import generatePathMap from './generatePathMap.cjs.js';

const categories = ['guides', 'lib', 'lib-v1', 'sdk', 'start'];

categories.forEach((cat) => {
  let category = directory[cat];
  let subCategories = Object.values(category.items);
  subCategories.forEach((subCategory) => {
    subCategory.items.forEach((itemNode) => {
      const title = itemNode.title;
      const route = itemNode.route;
      const filePath = `src/pages${route}/index.mdx`;
      if (fs.existsSync(filePath)) {
        console.log(`${title} has an index file ${route}`);
      } else {
        fs.writeFileSync(
          filePath,
          createIndexTemplate(
            route,
            cat === 'start' ? 'integration' : 'platform'
          )
        );
      }
    });
  });
});
const createIndexTemplate = (route, filterKind) => {
  return `
import ChooseFilterPage from '@/components/ChooseFilterPage';

import { PLATFORM_FILTER_OPTIONS } from '@/utils/filter-data.ts';

<ChooseFilterPage
    directoryPath="/ChooseFilterPage"
    address="${route}"
    filterKind="${filterKind}"
    filters={PLATFORM_FILTER_OPTIONS}
    currentFilter="all"
    message={'Choose ${filterKind === 'platform' ? 'a' : 'an'} ${filterKind}:'}
/>
`;
};

// const values = Object.values(directory);
// values.forEach((dirRoot) => {
//   const productRoot = dirRoot.productRoot;
//   let route = productRoot.route;
//   const filePath = `./src/pages${route}/index.mdx`;
//   const secondaryPath = `./src/pages${route}/index.tsx`;
//   if (fs.existsSync(filePath) || fs.existsSync(secondaryPath)) {
//     console.log(`index file exists for ${productRoot.title}`);
//   } else {
//     console.log(`index file does not extist for ${filePath}`);
//   }
// });

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
