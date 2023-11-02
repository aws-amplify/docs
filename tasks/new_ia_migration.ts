/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
const { globSync } = require('glob');
const fs = require('fs');
const reader = require('xlsx');

// get list of all files currently in pages-old
const oldPages = globSync('src/pages-old/**/*.mdx');

// remove all ChooseFilterPages
oldPages.forEach((file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) console.log('[ ERROR: READ CHOOSEFILTERPAGES ]', file, err);
    if (data.startsWith('import ChooseFilterPage')) {
      fs.rm(file, (err) => {
        if (err) console.log('[ ERROR: REMOVE CHOOSEFILTERPAGES ]', file, err);
      });
    }
  });
});

// get file data from Excel doc
const excelFile = reader.readFile(
  '/Users/katiegoi/katiegoines/docs/IA Migration combined (3).xlsm'
);

// exclude worksheets without migration data
const excelData = [];
const sheets = excelFile.SheetNames;
sheets.forEach((sheet) => {
  if (
    sheet != 'Samsara Pages' &&
    sheet != 'Naming Conventions' &&
    sheet != 'Validation lists'
  ) {
    const temp = reader.utils.sheet_to_json(excelFile.Sheets[sheet]);
    temp.forEach((res) => {
      excelData.push(res);
    });
  }
});

// filter out pages that aren't being migrated (no Original backend source || no New backend source)
const migrationData = [];
excelData.forEach((item) => {
  if (
    item['Original backend source'] != 'N/A' &&
    item['Original backend source'] != 'N/a' &&
    item['New backend source'] != 'N/A' &&
    item['New backend source'] != 'N/a' &&
    item['Classic or Samsara?'] == 'Classic'
  ) {
    migrationData.push(item);
  }
});

// compare migration data provided with existing pages in pages-old
const notAccountedForInMigrationDoc = [];
const inMigrationDocNotInPagesOld = [];
const pagesThatWillMigrate = [];
const excelDataOrigSource = [];
const excelDataNewSource = [];

migrationData.forEach((item) => {
  let itemSource = item['Original backend source'];
  itemSource = itemSource.replace('pages', 'pages-old');
  excelDataOrigSource.push(itemSource);
  excelDataNewSource.push(item['New backend source']);

  if (!oldPages.includes(itemSource)) {
    inMigrationDocNotInPagesOld.push(itemSource);
  }
});

oldPages.forEach((path) => {
  if (!excelDataOrigSource.includes(path)) {
    notAccountedForInMigrationDoc.push(path);
  } else {
    pagesThatWillMigrate.push(path);
  }
});

// console.log(oldPages.length, excelDataOrigSource.length);
// console.log(notAccountedForInMigrationDoc, inMigrationDocNotInPagesOld);

// log pages that are not accounted for in migration excel doc
// console.log('pages not accounted for in migration doc but that exist in pages-old file structure:', notAccountedForInMigrationDoc);
// console.log('pages that are found in pages-old structure and are notated in the excel for migration:', pagesThatWillMigrate);

// change all 'Original backend source' to 'pages-old'
migrationData.forEach((page) => {
  const origSource = page['Original backend source'];
  const oldPath = origSource.replace('pages', 'pages-old');
  page['Original backend source'] = oldPath;

  // combine multiple Excel entries for pages that have same 'New backend source' and set platform array
  // const multiples =
  //   excelDataNewSource.filter((path) => {
  //     return path == page['New backend source'];
  //   }).length > 1;

  // let platforms = [];
  // if (multiples) {
  //   const toCombine = migrationData.filter((item) => {
  //     return page['New backend source'] == item['New backend source'];
  //   });

  //   for (let i = 0; i < toCombine.length; i++) {
  //     toCombine[i]['Platform specific'] = toCombine[i]['Platform specific']
  //       .toLowerCase()
  //       .replace(' (web)', '')
  //       .replace('next.js', 'nextjs')
  //       .replace('react native', 'react-native');

  //     platforms.push("'" + toCombine[i]['Platform specific'] + "'");

  //     if (i != 0) {
  //       migrationData.splice(migrationData.indexOf(toCombine[i]), 1);
  //     }
  //   }
  // } else {
  //   page['Platform specific'] = page['Platform specific']
  //     .toLowerCase()
  //     .replace(' (web)', '')
  //     .replace('react native', 'react-native')
  //     .replace('next.js', 'nextjs');
  //   platforms.push("'" + page['Platform specific'] + "'");
  // }
  // platforms = platforms.filter((value, index) => {
  //   return platforms.indexOf(value) === index;
  // });
  // page['Platform specific'] = platforms;

  // // Update meta and imports for all pages accounted for in Excel file
  // // Then move to new location
  // let newContent = '';
  // fs.readFile(page['Original backend source'], 'utf8', (err, dataString) => {
  //   if (err) {
  //     console.log(
  //       '[ ERROR: READ FILE ORIGINAL BACKEND SOURCE ]',
  //       page['Original backend source'],
  //       err
  //     );
  //   } else {
  //     let data = dataString.split('\n');
  //     let exportIndex;
  //     let platformsListed = false;
  //     const platformsAll = `  platforms: [
  //         'android',
  //         'angular',
  //         'flutter',
  //         'javascript',
  //         'nextjs',
  //         'react',
  //         'react-native',
  //         'swift',
  //         'vue'
  //       ]`;

  //     if (dataString.includes('supportedPlatforms')) {
  //       platformsListed = true;
  //     }

  //     for (let i = 0; i < data.length; i++) {
  //       if (data[i].includes('title: ')) {
  //         let freshTitle;
  //         if (page['Page'].includes("'")) {
  //           freshTitle = '  title: "' + page['Page'] + '",';
  //         } else {
  //           freshTitle = "  title: '" + page['Page'] + "',";
  //         }
  //         data.splice(i, 1, freshTitle);
  //       } else if (data[i].includes('description:')) {
  //         if (
  //           data[i].split('`').length - 1 > 1 &&
  //           data[i].split("'").length - 1 > 0
  //         ) {
  //           data[i] = data[i].replaceAll('`', '"');
  //         } else if (data[i].split("'").length - 1 > 2) {
  //           data[i] = '"' + data.slice(1, -1) + '"';
  //         } else {
  //           data[i] = data[i].replaceAll('`', "'");
  //         }
  //         if (!data[i].includes("',") && !data[i].includes('",')) {
  //           data[i] = data[i] + ',';
  //         }
  //       } else if (data[i].includes('supportedPlatforms:')) {
  //         const platforms =
  //           page['Platform specific'] == 'Platform agnostic'
  //             ? platformsAll
  //             : page['Platform specific'];
  //         data.splice(i, 1, `  platforms: [${platforms}]`);
  //       } else if (data[i].includes('filterKey:')) {
  //         data.splice(i, 1, '<remove empty line>');
  //       } else if (data[i].includes('import { generateStaticPaths }')) {
  //         data.splice(i, 1, '<remove empty line>');
  //       } else if (data[i].includes('export const getStaticPaths')) {
  //         data.splice(i, 4, '<remove empty line>');
  //       } else if (data[i].includes('export const getStaticProps')) {
  //         data.splice(i, 9, '<remove empty line>');
  //       } else if (data[i].includes('import { INTEGRATION_FILTER_OPTIONS }')) {
  //         data.splice(i, 2, '<remove empty line>');
  //       } else if (data[i].includes('export const meta = {')) {
  //         if (data[i + 1] == '};' || data[i + 1] == '}') {
  //           exportIndex = i + 1;
  //         } else if (data[i + 2] == '};' || data[i + 2] == '}') {
  //           exportIndex = i + 2;
  //         } else if (data[i + 3] == '};' || data[i + 3] == '}') {
  //           exportIndex = i + 3;
  //         } else if (data[i + 4] == '};' || data[i + 4] == '}') {
  //           exportIndex = i + 4;
  //         } else if (data[i + 5] == '};' || data[i + 5] == '}') {
  //           exportIndex = i + 5;
  //         } else if (data[i + 6] == '};' || data[i + 6] == '}') {
  //           exportIndex = i + 6;
  //         } else if (data[i + 7] == '};' || data[i + 7] == '}') {
  //           exportIndex = i + 7;
  //         }
  //       }
  //     }

  //     const importToAdd = `import { getCustomStaticPath } from '@/utils/getCustomStaticPath';
  //           `;
  //     const exportToAdd = `
  // export const getStaticPaths = async () => {
  //   return getCustomStaticPath(meta.platforms);
  // };

  // export function getStaticProps(context) {
  //   return {
  //     props: {
  //       platform: context.params.platform,
  //       meta
  //     }
  //   };
  // }
  //   `;

  //     if (!dataString.includes(importToAdd) && platformsListed) {
  //       data.splice(exportIndex + 1, 0, exportToAdd);
  //       data.unshift(importToAdd);
  //     } else if (!dataString.includes(importToAdd) && !platformsListed) {
  //       data.splice(exportIndex + 1, 0, exportToAdd);
  //       data.unshift(importToAdd);
  //       data.splice(exportIndex + 1, 0, platformsAll);
  //     }

  //     data = data.filter((lines) => {
  //       return lines != '<remove empty line>';
  //     });

  //     newContent = data.join('\n');
  //     fs.writeFile(page['Original backend source'], newContent, (err) => {
  //       if (err) {
  //         console.log(
  //           '[ ERROR: WRITE CONTENT ]',
  //           page['Original backend source'],
  //           err
  //         );
  //       } else {
  //         console.log(
  //           '[ SUCCESS: EDITS WRITTEN ]',
  //           page['Original backend source']
  //         );
  //       }
  //     });
  //   }
  // });
  // console.log(pagesThatWillMigrate, page['Original backend source']);

  // if (pagesThatWillMigrate.includes(page['Original backend source'])) {
  //   console.log('pages will migrate');
  //   // create necessary directories exist in 'pages' for each file path
  //   const newPath = page['New backend source'];
  //   const dirPath = newPath.slice(0, newPath.lastIndexOf('/'));
  //   if (!fs.existsSync(dirPath)) {
  //     fs.mkdir(dirPath, { recursive: true }, (err) => {
  //       if (err) {
  //         console.log('[ ERROR: CREATE NEW DIRECTORIES ]', dirPath, err);
  //       } else {
  //         console.log('[ SUCCESS: FOLDER STRUCTURE CREATED ]', dirPath);
  //       }
  //     });
  //   }
  //   // move existing pages from pages-old into new IA locations
  //   if (
  //     fs.existsSync(page['Original backend source']) &&
  //     page['Flag for manual move'] != 'Yes'
  //   ) {
  //     fs.rename(
  //       page['Original backend source'],
  //       page['New backend source'],
  //       (err) => {
  //         if (err) {
  //           console.log(
  //             '[ ERROR: PAGE MOVE ]',
  //             page['New backend source'],
  //             err
  //           );
  //         } else {
  //           console.log(
  //             '[ SUCCESS: RENAME FILE ]',
  //             page['Original backend source'],
  //             '-->',
  //             page['New backend source']
  //           );
  //         }
  //       }
  //     );
  //   } else {
  //     if (!fs.existsSync(page['Original backend source'])) {
  //       console.log(
  //         ' [ERROR: PAGE TO MOVE DOESNT EXIST ]',
  //         page['Original backend source']
  //       );
  //     } else if (page['Flag for manual move'] != 'Yes') {
  //       console.log(
  //         ' [ERROR: PAGE FLAGGED FOR MANUAL MOVE ]',
  //         page['Original backend source']
  //       );
  //     }
  //   }
  // }
});

// Fix quotation characters in migrated pages
const migratedPages = globSync('src/pages/**/*.mdx');

// migratedPages.forEach((page) => {
//   // console.log(page);
//   let newContent = '';
//   fs.readFile(page, 'utf8', (err, dataString) => {
//     let data = dataString.split('\n');
//     // console.log(data);

//     if (err) {
//       console.log('[ ERROR: READING PAGE', page);
//     } else {
//       for (let i = 0; i < data.length; i++) {
//         if (data[i].includes('title: `') && data[i].split("'").length - 1 < 1) {
//           data[i] = data[i].replaceAll('`', "'");
//         } else if (
//           data[i].includes('title: `') &&
//           data[i].split("'").length > 0
//         ) {
//           data[i] = data[i].replaceAll('`', '"');
//         } else if (
//           data[i].includes('description: `') &&
//           data[i].split("'").length - 1 > 0
//         ) {
//           data[i] = data[i].replaceAll('`', '"');
//         } else if (
//           data[i].includes('description: `') &&
//           data[i].split("'").length - 1 < 1
//         ) {
//           data[i] = data[i].replaceAll('`', "'");
//         }
//       }
//     }

//     newContent = data.join('\n');
//     console.log(newContent);
//     fs.writeFile(page, newContent, (err) => {
//       if (err) {
//         console.log('[ ERROR: WRITE CONTENT ]', page, err);
//       } else {
//         console.log('[ SUCCESS: EDITS WRITTEN ]', page);
//       }
//     });
//   });
// });

// check pages for fragments/inlinefilters not accounted for in meta.platforms

migratedPages.forEach((page) => {
  // console.log(page);
  let newContent = '';
  fs.readFile(page, 'utf8', (err, dataString) => {
    if (err) {
      console.log('[ ERROR: READING PAGE', page);
    } else {
      let data = dataString.split('\n');
      // console.log(data);

      let platformsFromBody = [];
      const platformsFromMetaOneLine = [];
      const platformsFromMetaMultiLine = [];
      let platformListIndex;
      let count = 0;

      data.forEach((line) => {
        // if (!dataString.includes('platforms: ')) {
        //   console.log(page);
        //   if (line.includes('export const getStaticPaths = async () => {')) {
        //     console.log(line);
        //   }
        // }
        if (line.startsWith('<Fragments fragments={{')) {
          let p = line.slice(line.indexOf('{') + 2, line.indexOf('}'));
          p = p.split(',');
          p.forEach((item) => {
            let platform = item.split(':');
            platform = platform[0]
              .replaceAll("'", '')
              .replaceAll(' ', '')
              .replaceAll('"', '')
              .replaceAll('js', 'javascript');
            platformsFromBody.push(platform);
          });
          // console.log(p);
        } else if (line.startsWith('<InlineFilter filters={[')) {
          if (line.includes('js')) {
            line = line.replace('js', 'javascript');
          }
          if (line.includes('ios')) {
            line = line.replace('ios', 'swift');
          }

          let p = line.slice(line.indexOf('[') + 1, line.indexOf(']'));
          p = p.split(',');
          p.forEach((item) => {
            const platform = item
              .replaceAll("'", '')
              .replaceAll('"', '')
              .replaceAll('`', '')
              .replaceAll(' ', '')
              .replaceAll('js', 'javascript');
            platformsFromBody.push(platform);
          });
        } else if (line.includes('platforms: ')) {
          platformListIndex = data.indexOf(line);

          if (line.includes('ios') && line.includes('swift')) {
            line = line.replace('ios', '');
            line = line.replace(", ''", '');
          } else if (line.includes('ios') && !line.includes('swift')) {
            line = line.replace('ios', 'swift');
          }

          let p = line.slice(line.indexOf('[') + 1, line.indexOf(']'));
          p = p.split(',');

          p.forEach((item) => {
            item = item
              .replaceAll('"', '')
              .replaceAll("'", '')
              .replaceAll(' ', '');
            if (item.length) {
              platformsFromMetaOneLine.push(item);
            }
          });
        } else if (
          line.startsWith("    'android'") ||
          line.startsWith("    'angular'") ||
          line.startsWith("    'flutter'") ||
          line.startsWith("    'javascript'") ||
          line.startsWith("    'nextjs'") ||
          line.startsWith("    'react'") ||
          line.startsWith("    'react-native'") ||
          line.startsWith("    'swift'") ||
          line.startsWith("    'vue'")
        ) {
          const p = line
            .replaceAll(' ', '')
            .replaceAll('"', '')
            .replaceAll("'", '')
            .replaceAll(',', '');
          platformsFromMetaMultiLine.push(p);
        }
        // console.log(line);
      });
      const platformsAll = [
        'android',
        'angular',
        'flutter',
        'javascript',
        'nextjs',
        'react',
        'react-native',
        'swift',
        'vue'
      ];
      if (platformsFromBody.includes('all')) {
        platformsAll.forEach((p) => {
          platformsFromBody.push(p);
        });
        platformsFromBody = platformsFromBody.filter((ob) => {
          return ob != 'all';
        });
      }

      let filteredPlatforms = platformsFromBody.filter((value, index) => {
        return platformsFromBody.indexOf(value) === index;
      });
      // console.log(filteredPlatforms);
      // console.log(platformsFromMetaMultiLine);
      // console.log(platformsFromMetaOneLine);
      filteredPlatforms.forEach((platform) => {
        if (
          filteredPlatforms.includes('swift') &&
          filteredPlatforms.includes('ios')
        ) {
          filteredPlatforms.splice(filteredPlatforms.indexOf('ios'), 1);
          // console.log(filteredPlatforms);
        } else if (
          !filteredPlatforms.includes('swift') &&
          filteredPlatforms.includes('ios')
        ) {
          filteredPlatforms.splice(
            filteredPlatforms.indexOf('ios'),
            1,
            'swift'
          );
          // console.log(filteredPlatforms);
        }
        // console.log(!platformsFromMetaMultiLine.includes(platform));
        if (
          platformsFromMetaOneLine.length > 0 &&
          !platformsFromMetaOneLine.includes(platform)
        ) {
          data[platformListIndex] = data[platformListIndex].replace(
            ']',
            ", '" + platform + "']"
          );
          console.log(
            page,
            platformsFromMetaOneLine,
            platform,
            data[platformListIndex]
          );
        } else if (
          platformsFromMetaMultiLine.length > 0 &&
          !platformsFromMetaMultiLine.includes(platform) &&
          platform != 'next'
        ) {
          console.log(page, platformsFromMetaMultiLine, platform);
        }
      });
      newContent = data.join('\n');
      // console.log(newContent);

      if (data != newContent) {
        console.log(page);
      }
      // fs.writeFile(page, newContent, (err) => {
      //   if (err) {
      //     console.log('[ ERROR: WRITE CONTENT ]', page, err);
      //   } else if (data != newContent) {
      //     console.log('[ SUCCESS: EDITS WRITTEN ]', page);
      //   }
      // });
    }
  });
});
