const { glob } = require('glob');
const fs = require('fs');

const csv = fs.readFileSync(
  '/Users/katiegoi/katiegoines/docs/ia_migration_kk.csv',
  'utf8'
);

const json = function(csv) {
  const lines = csv.split('\n');
  const result = [];
  const headers = lines[0].split(',');
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentline = lines[i].split(',');
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }
  return JSON.parse(JSON.stringify(result));
};

const data = json(csv);

console.log(data);

// glob('src/pages/**/*.mdx').then((files) => {
//   files.forEach((firstFile) => {
//     if(firstFile.startsWith('src/pages/'))
//     console.log(firstFile);
//     //     fs.readFile(firstFile, "utf-8", function (err, buf) {
//     //       let lines = buf.split("\n");

//     //       let metaStart = -1;
//     //       let metaEnd = -1;
//     //       let filterKey = -1;
//     //       //find the meta object
//     //       for (let i = 0; i < lines.length; i++) {
//     //         if (lines[i].indexOf("export const meta") !== 0) {
//     //           metaStart = i;
//     //         }
//     //         if (
//     //           metaEnd === -1 &&
//     //           metaStart !== -1 &&
//     //           lines[i].indexOf("};") !== -1
//     //         ) {
//     //           metaEnd = i;
//     //         }
//     //         if (
//     //           metaStart !== -1 &&
//     //           metaEnd === -1 &&
//     //           lines[i].indexOf("filterKey") !== -1
//     //         ) {
//     //           filterKey = i;
//     //         }
//     //       }

//     //       if (metaStart === -1 || metaEnd === -1) {
//     //         //something is wrong we didn't find the meta object
//     //       } else {
//     //         //add trailing , to last item in the row
//     //         let lineBefore = lines[metaEnd - 1];
//     //         if (!lineBefore.endsWith(",")) {
//     //           lineBefore = lineBefore + ",";
//     //           lines[metaEnd - 1] = lineBefore;
//     //         }

//     //         //replace closing meta curly with closing meta curly + export functions
//     //         const addLines = `  filterKey: "integration",
//     //   supportedPlatforms: INTEGRATION_FILTER_OPTIONS
//     // };

//     // import { generateStaticPaths } from "@/utils/generateStaticPaths.tsx";

//     // import { INTEGRATION_FILTER_OPTIONS } from "@/utils/filter-data.ts";

//     // export const getStaticPaths = () => {
//     //     return generateStaticPaths(meta.filterKey, meta.supportedPlatforms);
//     // };

//     // export const getStaticProps = (context) => {
//     //     return {
//     //         props: {
//     //             integration: context.params.integration,
//     //             filterKind: meta.filterKey
//     //         }
//     //     };
//     // };`;
//     //         lines[metaEnd] = addLines;
//     //       }

//     //       if (filterKey !== -1) {
//     //         //remove filterKey if it exists
//     //         lines.splice(filterKey, 1);
//     //       }

//     //       //write whole thing back to file
//     //       const newFile = lines.join("\n");
//     //       fs.writeFile(firstFile, newFile, () => {
//     //         if (err) console.log(err);
//     //       });
//     //     });
//   });
// });
