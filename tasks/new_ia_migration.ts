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
migrationData.forEach((item) => {
  const origSource = item['Original backend source'];
  const oldPath = origSource.replace('pages', 'pages-old');
  item['Original backend source'] = oldPath;
});

// combine multiple Excel entries for pages that have same 'New backend source' and set platform array
migrationData.forEach((item) => {
  const multiples =
    excelDataNewSource.filter((path) => {
      return path == item['New backend source'];
    }).length > 1;

  let platforms = [];
  if (multiples) {
    const toCombine = migrationData.filter((item2) => {
      return item['New backend source'] == item2['New backend source'];
    });

    for (let i = 0; i < toCombine.length; i++) {
      toCombine[i]['Platform specific'] = toCombine[i]['Platform specific']
        .toLowerCase()
        .replace(' (web)', '')
        .replace('.js', '')
        .replace('react native', 'react-native');

      platforms.push("'" + toCombine[i]['Platform specific'] + "'");

      if (i != 0) {
        migrationData.splice(migrationData.indexOf(toCombine[i]), 1);
      }
    }
  } else {
    item['Platform specific'] = item['Platform specific']
      .toLowerCase()
      .replace(' (web)', '')
      .replace('.js', '')
      .replace('react native', 'react-native');
    platforms.push("'" + item['Platform specific'] + "'");
  }
  platforms = platforms.filter((value, index) => {
    return platforms.indexOf(value) === index;
  });
  item['Platform specific'] = platforms;
});

// Update meta and imports for all pages accounted for in Excel file
// Then move to new location
migrationData.forEach((page) => {
  let newContent = '';
  // if (fs.existsSync(oldPages[page['Original backend source']])) {
  fs.readFile(page['Original backend source'], 'utf8', (err, dataString) => {
    if (err) {
      console.log(err);
    } else {
      let data = dataString.split('\n');
      let exportIndex = '';
      data.forEach((line) => {
        if (line.includes('title: ')) {
          data.splice(data.indexOf(line), 1, `  title: '${page['Page']}',`);
        } else if (line.includes('description:')) {
          line.replace('`', "'");
        } else if (line.includes('supportedPlatforms:')) {
          exportIndex = data.indexOf(line);
          data.splice(
            data.indexOf(line),
            1,
            `  platforms: [ ${page['Platform specific']} ]`
          );
        } else if (line.includes('filterKey:')) {
          data.splice(data.indexOf(line), 1, '<remove empty line>');
        } else if (line.includes('import { generateStaticPaths }')) {
          data.splice(data.indexOf(line), 1, '<remove empty line>');
        } else if (line.includes('export const getStaticPaths')) {
          data.splice(data.indexOf(line), 4, '<remove empty line>');
        } else if (line.includes('export const getStaticProps')) {
          data.splice(data.indexOf(line), 9, '<remove empty line>');
        } else if (line.includes('import { INTEGRATION_FILTER_OPTIONS }')) {
          data.splice(data.indexOf(line), 2, '<remove empty line>');
        }
      });

      const importToAdd = `import { getCustomStaticPath } from '@/utils/getCustomStaticPath';
        `;
      const exportToAdd = `export const getStaticPaths = async () => {
  return getCustomStaticPath(meta.platforms);
};
      
export function getStaticProps(context) {
  return {
    props: {
      platform: context.params.platform,
      meta
    }
  };
}`;

      if (!dataString.includes(importToAdd)) {
        data.splice(exportIndex + 4, 0, exportToAdd);
        data.unshift(importToAdd);
      }

      data = data.filter((lines) => {
        return lines != '<remove empty line>';
      });

      newContent = data.join('\n');
      // console.log(newContent);
      fs.writeFile(page['Original backend source'], newContent, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log(
            '[ EDITS SUCCESSFULLY WRITTEN ]',
            page['Original backend source']
          );
        }
      });
    }
  });

  if (pagesThatWillMigrate.includes(page['Original backend source'])) {
    // create necessary directories exist in 'pages' for each file path
    const newPath = page['New backend source'];
    const dirPath = newPath.slice(0, newPath.lastIndexOf('/'));

    if (!fs.existsSync(dirPath)) {
      fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('[ FOLDER STRUCTURE CREATED ]', dirPath);
        }
      });
    }

    // move existing pages from pages-old into new IA locations
    if (
      fs.existsSync(page['Original backend source']) &&
      page['Flag for manual move'] != 'Yes'
    ) {
      fs.rename(
        page['Original backend source'],
        page['New backend source'],
        (err) => {
          if (err) {
            console.log(page['New backend source'], err);
          } else {
            console.log(
              'rename successful: ',
              page['Original backend source'],
              '-->',
              page['New backend source']
            );
          }
        }
      );
    }
  }
});

// TO COMPLETE
// commands will be done manually
// return list of pages not migrated

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
