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
    if (err) console.log(err);
    if (data.startsWith('import ChooseFilterPage')) {
      fs.rm(file, (err) => {
        if (err) console.log(err);
      });
    }
  });
});

// get file data from Excel doc
const excelFile = reader.readFile(
  '/Users/katiegoi/katiegoines/docs/IA Migration combined (2).xlsm'
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

// filter out pages that aren't being migrated
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

// create necessary directories exist in 'pages' for each file path
// migrationData.forEach((item) => {
//   const newPath = item['New backend source'];
//   const dirPath = newPath.slice(0, newPath.lastIndexOf('/'));

//   if (!fs.existsSync(dirPath)) {
//     fs.mkdir(dirPath, { recursive: true }, (err) => {
//       if (err) throw err;
//     });
//     console.log('folder structure created for: ', dirPath);
//   }
// });

// combine multiple entries for pages that are available for multiple platforms
migrationData.forEach((item) => {
  const multiples =
    excelDataNewSource.filter((path) => {
      return path == item['New backend source'];
    }).length > 1;

  if (multiples) {
    console.log(item);
  }

  // move existing pages from pages-old into new IA locations

  const origSource = item['Original backend source'];
  const oldPath = origSource.replace('pages', 'pages-old'); // change path to account for move of old pages into 'pages-old'
  // console.log(origSource, '-->', oldPath);
  if (fs.existsSync(oldPath)) {
    // console.log(oldPath);
    // fs.rename(oldPath, item['New backend source'], (err) => {
    //   if (err) {
    //     console.log(item['New backend source'], err);
    //   } else {
    //     console.log(
    //       'rename successful: ',
    //       oldPath,
    //       '-->',
    //       item['New backend source']
    //     );
    //   }
    // });
  } else {
    // console.log('file already moved:', oldPath);
  }

  // change content of migrated pages - new meta structure and imports
  // fs.readFile(item['New backend source'], 'utf8', (err, data) => {
  //   if (err) console.log(err)
  //   // console.log(data)
  // });
});

// remove all ChooseFilterPages from pages-old
// glob('src/pages-old/**/*.mdx').then((files) => {
//   files.forEach((firstFile) => {
//     fs.readFile(firstFile, 'utf8', (err, data) => {
//       if (err) console.log(err);
//       if (data.startsWith('import ChooseFilterPage')) {
//         fs.rm(firstFile, (err) => {
//           console.log(err);
//         });
//       }
//     });
//   });
//   // list remaining pages in pages-old structure
//   // console.log('files remaining in pages-old: ', files);
// });

// remove empty directories from pages-old
// glob('src/pages-old/**/').then((directories) => {
//   directories.forEach((directory) => {
//     fs.readdir(
//       directory,
//       { encoding: 'utf8', recursive: true },
//       (err, files) => {
//         if (err) {
//           console.log(err);
//         } else {
//           if (!files.length) {
//             fs.rmdir(directory, { recursive: true }, (err) => {
//               if (err) console.log(err);
//             });
//           }
//         }
//       }
//     );
//   });
//   // console.log('remaining directories:', directories);
// });

// change content of migrated pages - new meta structure and imports
// glob('src/pages/**/*.mdx').then((files) => {
//   // const platPages = files.filter((file) => {
//   //   file.startsWith('src/pages/gen2');
//   // });
//   // console.log(platPages)
//   files.forEach((firstFile) => {
//     if (!firstFile.startsWith('src/pages/gen2/')) {
//       // console.log(firstFile)
//       fs.readFile(firstFile, 'utf8', (err, data) => {
//         if (err) console.log(err);
//         if (data) {
//           data = data.split('\n');
//           const meta = data['export const meta'];
//           // console.log(data);

//           if (
//             !data.includes(
//               "import { getCustomStaticPath } from '@/utils/getCustomStaticPath';"
//             )
//           ) {
//             // console.log(data);
//           }
//         }
//         // console.log(
//         //   '-----------------------------------------------',
//         //   firstFile,
//         //   '---------------------------------------'
//         // );

//         // console.log(data);
//         // console.log(
//         //   '----------------------------------------------- end page ---------------------------------------'
//         // );
//       });
