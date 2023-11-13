// /* eslint-disable no-console */
// /* eslint-disable @typescript-eslint/no-var-requires */
const { globSync, glob } = require('glob');
const fs = require('fs');
const reader = require('xlsx');

// remove all index.mdx that aren't parents
const cleanupPagesFiles = function () {
  const pages = globSync('src/pages/**/*.mdx');

  pages.forEach((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      // console.log(data);
      const searchTerm = `
export function getStaticProps(context) {
  return {
    props: {
      platform: context.params.platform,
      meta
    }
  };
}`;

      if (err) {
        console.log('[ ERROR: READ INDEX.MDX ]', file, err);
      } else if (data.includes(searchTerm)) {
        // console.log(file);
        fs.rm(file, (err) => {
          if (err) {
            console.log('[ ERROR: REMOVE CHOOSEFILTERPAGES ]', file, err);
          }
        });
      }
    });
  });
};

// remove empty directories
const cleanupPagesDirectories = function () {
  glob('src/pages/**/').then((directories) => {
    directories.forEach((directory) => {
      fs.readdir(
        directory,
        { encoding: 'utf8', recursive: true },
        (err, files) => {
          if (err) {
            console.log(err);
          } else {
            if (!files.length) {
              fs.rmdir(directory, { recursive: true }, (err) => {
                if (err) console.log(err);
              });
            }
          }
        }
      );
    });
  });
};

// Cleanup pages-old (remove all Choose Filter Pages)
const cleanupPagesOld = function () {
  const oldPages = globSync('src/pages-old/**/*.mdx');

  oldPages.forEach((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) console.log('[ ERROR: READ CHOOSEFILTERPAGES ]', file, err);
      if (data.startsWith('import ChooseFilterPage')) {
        fs.rm(file, (err) => {
          if (err)
            console.log('[ ERROR: REMOVE CHOOSEFILTERPAGES ]', file, err);
        });
      }
    });
  });
};

const getMigrationData = function () {
  const migrationData = [];
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

  // filter out pages that aren't being migrated (no Original backend source || no New backend source)
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

  migrationData.forEach((page) => {
    // change all 'Original backend source' to 'pages-old'
    const origSource = page['Original backend source'];
    const oldPath = origSource.replace('pages', 'pages-old');
    page['Original backend source'] = oldPath;

    // make sure all paths are lowercase
    page['New backend source'] = page['New backend source'].toLowerCase();
  });

  return migrationData;
};

const migrationData = getMigrationData();

const listDestUrls = function () {
  const listOfDestUrls = [];

  migrationData.forEach((item) => {
    listOfDestUrls.push(item['New backend source']);
  });

  return listOfDestUrls;
};

const checks = function () {
  // compare migration data provided with existing pages in pages-old
  const oldPages = globSync('src/pages-old/**/*.mdx');
  const pagesThatShouldHaveMigrated_Source = [];
  const pagesThatShouldHaveMigrated_Destination = [];
  const pagesThatFailedMigration = [];

  let uniq = {};
  const deduped = migrationData.filter(
    (obj) =>
      !uniq[obj['New backend source']] &&
      (uniq[obj['New backend source']] = true)
  );

  console.log(migrationData.length);
  console.log(deduped.length);

  // deduped.forEach((page) => {
  //   const originalRoute = page['Original backend source'];
  //   const migratedRoute = page['New backend source'];

  //   pagesThatShouldHaveMigrated_Source.push(originalRoute);
  //   pagesThatShouldHaveMigrated_Destination.push(migratedRoute);

  //   if (fs.existsSync(migratedRoute) && !fs.existsSync(originalRoute)) {
  //     // console.log('[ SUCCESS - PAGE MOVED ]', migratedRoute);
  //   } else if (!fs.existsSync(migratedRoute) && fs.existsSync(originalRoute)) {
  //     pagesThatFailedMigration.push(page);
  //     // console.log('[ FAILURE - PAGE DIDNT MOVE ]', migratedRoute);
  //   } else if (fs.existsSync(migratedRoute) && fs.existsSync(originalRoute)) {
  //     console.log('[ CONFUSION - PAGE IN BOTH PLACES ]', migratedRoute);
  //   }
  // });

  // console.log(pagesThatFailedMigration.length, pagesThatFailedMigration);

  oldPages.forEach((page) => {
    if (pagesThatShouldHaveMigrated_Source.includes(page)) {
      console.log('[ FAILURE - PAGE SHOULD HAVE MOVED ]', page);
    } else if (!pagesThatShouldHaveMigrated_Source.includes(page)) {
      console.log('[ PAGE DOESNT EXIST IN SOURCE YET ]', page);
    } else {
      console.log('[WHAT IS HAPPENING HERE ]');
    }
  });
};

const updatePageContent = function () {
  migrationData.forEach((page) => {
    // combine multiple Excel entries for pages that have same 'New backend source' and set platform array

    const multiples =
      listDestUrls().filter((path) => {
        return path == page['New backend source'];
      }).length > 1;

    let platforms = [];
    if (multiples) {
      const toCombine = migrationData.filter((item) => {
        return page['New backend source'] == item['New backend source'];
      });

      for (let i = 0; i < toCombine.length; i++) {
        toCombine[i]['Platform specific'] = toCombine[i]['Platform specific']
          .toLowerCase()
          .replace(' (web)', '')
          .replace('next.js', 'nextjs')
          .replace('react native', 'react-native');

        platforms.push("'" + toCombine[i]['Platform specific'] + "'");

        if (i != 0) {
          migrationData.splice(migrationData.indexOf(toCombine[i]), 1);
        }
      }
    } else {
      page['Platform specific'] = page['Platform specific']
        .toLowerCase()
        .replace(' (web)', '')
        .replace('react native', 'react-native')
        .replace('next.js', 'nextjs');
      platforms.push("'" + page['Platform specific'] + "'");
    }
    platforms = platforms.filter((value, index) => {
      return platforms.indexOf(value) === index;
    });
    page['Platform specific'] = platforms;

    // Update meta and imports for all pages accounted for in Excel file
    // Then move to new location
    let newContent = '';
    fs.readFile(page['Original backend source'], 'utf8', (err, dataString) => {
      if (err) {
        console.log(
          '[ ERROR READING FILE - ORIGINAL BACKEND SOURCE ]',
          page['Original backend source'],
          err
        );
      } else {
        let data = dataString.split('\n');
        let exportIndex;
        let platformsListed = false;
        const platformsAll = `  platforms: [
                'android',
                'angular',
                'flutter',
                'javascript',
                'nextjs',
                'react',
                'react-native',
                'swift',
                'vue'
              ]`;

        if (dataString.includes('supportedPlatforms')) {
          platformsListed = true;
        }

        let titleCount = 0;
        let descriptionCount = 0;
        let platformsCount = 0;

        for (let i = 0; i < data.length; i++) {
          if (data[i].includes('title: ') && titleCount == 0) {
            titleCount = titleCount + 1;
            let freshTitle;
            if (page['Page'].includes("'")) {
              freshTitle = '  title: "' + page['Page'] + '",';
            } else {
              freshTitle = "  title: '" + page['Page'] + "',";
            }
            data.splice(i, 1, freshTitle);
          } else if (
            data[i].includes('description:') &&
            descriptionCount == 0
          ) {
            descriptionCount = descriptionCount + 1;
            if (
              data[i].split('`').length - 1 > 1 &&
              data[i].split("'").length - 1 > 0
            ) {
              data[i] = data[i].replaceAll('`', '"');
            } else if (data[i].split("'").length - 1 > 2) {
              data[i] = '"' + data.slice(1, -1) + '"';
            } else {
              data[i] = data[i].replaceAll('`', "'");
            }
            if (!data[i].includes("',") && !data[i].includes('",')) {
              data[i] = data[i] + ',';
            }
          } else if (
            data[i].includes('supportedPlatforms:') &&
            platformsCount == 0
          ) {
            platformsCount = platformsCount + 1;
            const platforms =
              page['Platform specific'] == 'Platform agnostic'
                ? platformsAll
                : page['Platform specific'];
            data.splice(i, 1, `  platforms: [${platforms}]`);
          } else if (data[i].includes('filterKey:')) {
            data.splice(i, 1, '<remove empty line>');
          } else if (data[i].includes('import { generateStaticPaths }')) {
            data.splice(i, 1, '<remove empty line>');
          } else if (data[i].includes('export const getStaticPaths')) {
            data.splice(i, 4, '<remove empty line>');
          } else if (data[i].includes('export const getStaticProps')) {
            data.splice(i, 9, '<remove empty line>');
          } else if (
            data[i].includes('import { INTEGRATION_FILTER_OPTIONS }')
          ) {
            data.splice(i, 2, '<remove empty line>');
          } else if (data[i].includes('export const meta = {')) {
            if (data[i + 1] == '};' || data[i + 1] == '}') {
              exportIndex = i + 1;
            } else if (data[i + 2] == '};' || data[i + 2] == '}') {
              exportIndex = i + 2;
            } else if (data[i + 3] == '};' || data[i + 3] == '}') {
              exportIndex = i + 3;
            } else if (data[i + 4] == '};' || data[i + 4] == '}') {
              exportIndex = i + 4;
            } else if (data[i + 5] == '};' || data[i + 5] == '}') {
              exportIndex = i + 5;
            } else if (data[i + 6] == '};' || data[i + 6] == '}') {
              exportIndex = i + 6;
            } else if (data[i + 7] == '};' || data[i + 7] == '}') {
              exportIndex = i + 7;
            }
          }
        }

        const importToAdd = `import { getCustomStaticPath } from '@/utils/getCustomStaticPath';
                  `;
        const exportToAdd = `
export const getStaticPaths = async () => {
  return getCustomStaticPath(meta.platforms);
};

export function getStaticProps(context) {
  return {
    props: {
      platform: context.params.platform,
      meta
    }
  };
}
          `;

        if (!dataString.includes(importToAdd) && platformsListed) {
          data.splice(exportIndex + 1, 0, exportToAdd);
          data.unshift(importToAdd);
        } else if (!dataString.includes(importToAdd) && !platformsListed) {
          data.splice(exportIndex + 1, 0, exportToAdd);
          data.unshift(importToAdd);
          data.splice(exportIndex + 1, 0, platformsAll);
        }

        data = data.filter((lines) => {
          return lines != '<remove empty line>';
        });

        newContent = data.join('\n');
        fs.writeFile(page['Original backend source'], newContent, (err) => {
          if (err) {
            console.log(
              '[ ERROR WRITING CONTENT ]',
              page['Original backend source'],
              err
            );
          } else {
            console.log(
              '[ SUCCESS WRITING CONTENT ]',
              page['Original backend source']
            );
          }
        });
      }
    });
  });
};

let pageToMoveDoesntExist = 0;
let pageWasntMoved = 0;

const move = function (page) {
  // move existing pages from pages-old into new IA locations
  const originalPath = page['Original backend source'];
  const destinationPath = page['New backend source'];

  if (
    fs.existsSync(originalPath) &&
    !fs.existsSync(destinationPath) &&
    page['Flag for manual move'] != 'Yes'
  ) {
    fs.rename(originalPath, destinationPath, (err) => {
      if (err) {
        pageWasntMoved = pageWasntMoved + 1;

        console.log('[ ERROR: PAGE CANNOT BE MOVED ]', destinationPath, err);
      } else {
        // console.log(
        //   // '[ SUCCESS: FILE RENAMED ]',
        //   originalPath,
        //   '-->',
        //   destinationPath
        // );
      }
    });
  } else if (
    fs.existsSync(originalPath) &&
    fs.existsSync(destinationPath) &&
    page['Flag for manual move'] != 'Yes'
  ) {
    console.log(
      '[ DUPLICATE DESTINATION PATH. PAGE ALREADY EXISTS IN THIS LOCATION ]',
      originalPath,
      '-->',
      destinationPath
    );
  } else if (
    !fs.existsSync(originalPath) &&
    !fs.existsSync(destinationPath) &&
    page['Flag for manual move'] != 'Yes'
  ) {
    pageToMoveDoesntExist = pageToMoveDoesntExist + 1;
    console.log(' [ ERROR: PAGE TO MOVE DOESNT EXIST ]', originalPath);
    // } else if (!fs.existsSync(originalPath) && fs.existsSync(destinationPath)) {
    //   console.log(
    //     ' [ : PAGE HAS ALREADY BEEN MOVED ]',
    //     originalPath
    //   );
  } else if (page['Flag for manual move'] != 'Yes') {
    console.log(' [ ERROR: PAGE FLAGGED FOR MANUAL MOVE ]', originalPath);
  }
};

const movePages = function () {
  migrationData.forEach((page) => {
    // create necessary directories exist in 'pages' for each file path
    const newPath = page['New backend source'];
    const dirPath = newPath.slice(0, newPath.lastIndexOf('/'));
    if (!fs.existsSync(dirPath)) {
      fs.mkdir(dirPath, { recursive: true }, (err) => {
        if (err) {
          console.log('[ ERROR: DIRECTORIES NOT CREATED ]', dirPath, err);
        } else {
          move(page);
          // console.log('[ SUCCESS: FOLDER STRUCTURE CREATED ]', dirPath);
        }
      });
    } else {
      move(page);
    }
  });
  // console.log('Pages to be moved that do not exist: ', pageToMoveDoesntExist);
  // console.log('Pages that were not moved: ', pageWasntMoved);
};

// Replace ` with ' in migrated pages
const fixTics = function () {
  const migratedPages = globSync('src/pages/**/*.mdx');

  migratedPages.forEach((page) => {
    // console.log(page);
    let newContent = '';
    fs.readFile(page, 'utf8', (err, dataString) => {
      if (!dataString) {
        console.log(page);
      }
      let data = dataString.split('\n');
      // console.log(data);

      if (err) {
        console.log('[ ERROR: READING PAGE', page);
      } else {
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].includes('title: `') &&
            data[i].split("'").length - 1 < 1
          ) {
            data[i] = data[i].replaceAll('`', "'");
          } else if (
            data[i].includes('title: `') &&
            data[i].split("'").length > 0
          ) {
            data[i] = data[i].replaceAll('`', '"');
          } else if (
            data[i].includes('description: `') &&
            data[i].split("'").length - 1 > 0
          ) {
            data[i] = data[i].replaceAll('`', '"');
          } else if (
            data[i].includes('description: `') &&
            data[i].split("'").length - 1 < 1
          ) {
            data[i] = data[i].replaceAll('`', "'");
          }
        }
      }

      newContent = data.join('\n');
      console.log(newContent);
      fs.writeFile(page, newContent, (err) => {
        if (err) {
          console.log('[ ERROR: WRITE CONTENT ]', page, err);
        } else {
          console.log('[ SUCCESS: CHARACTER EDITS WRITTEN ]', page);
        }
      });
    });
  });
};

// check pages for fragments/inlinefilters not accounted for in meta.platforms
const checkForAddtlPlatforms = function () {
  const migratedPages = globSync('src/pages/**/*.mdx');

  migratedPages.forEach((page) => {
    let newContent = '';
    fs.readFile(page, 'utf8', (err, dataString) => {
      if (err) {
        console.log('[ ERROR: READING PAGE', page);
      } else {
        let data = dataString.split('\n');
        let platformsFromBody = [];
        const platformsFromMetaOneLine = [];
        const platformsFromMetaMultiLine = [];
        let platformListIndex;
        let count = 0;

        data.forEach((line) => {
          if (line.includes('<Fragments fragments={{')) {
            let p = line.slice(line.indexOf('{') + 2, line.indexOf('}'));
            p = p.split(',');
            p.forEach((item) => {
              let platform = item.split(':');
              platform = platform[0]
                .replaceAll("'", '')
                .replaceAll(' ', '')
                .replaceAll('"', '')
                .replaceAll('js', 'javascript')
                .replaceAll('ios', 'swift');
              platformsFromBody.push(platform);
            });
          } else if (line.startsWith('<InlineFilter filters={[')) {
            if (line.includes('js')) {
              line = line.replace('js', 'javascript');
            }
            if (line.includes('ios') && !line.includes('swift')) {
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
          }
          if (
            platformsFromMetaOneLine.length > 0 &&
            !platformsFromMetaOneLine.includes(platform)
          ) {
            data[platformListIndex] = data[platformListIndex].replace(
              ']',
              ", '" + platform + "']"
            );
          } else if (
            platformsFromMetaMultiLine.length > 0 &&
            !platformsFromMetaMultiLine.includes(platform) &&
            platform != 'next'
          ) {
            console.log(page, platformsFromMetaMultiLine, platform);
          }
        });

        // make sure all instances of 'ios' are changed to 'swift'
        for (let i = 0; i < data.length; i++) {
          if (data[i].includes('platforms: [') && data[i].includes('ios')) {
            let arrayAsString = data[i].slice(data[i].indexOf('[') + 1);
            arrayAsString = arrayAsString.slice(0, -1).replaceAll(' ', '');
            const array = arrayAsString.split(',');
            if (array.includes("'swift'")) {
              const filtered = array.filter((value) => {
                return value != "'ios'";
              });
              data[i] = '  platforms: [' + filtered.join(',') + ']';
            } else if (!array.includes("'swift'")) {
              const numOfInst = array.filter((item) => {
                return item == "'ios'";
              }).length;
              array.splice(array.indexOf("'ios'"), 1, "'swift'");
              if (numOfInst > 1) array.splice(array.lastIndexOf("'ios'"), 1);
              data[i] = '  platforms: [' + array.join(',') + ']';
            }
          } else if (
            data[i].includes('platforms: [') &&
            data[i + 1].includes("'ios'")
          ) {
            data.splice(i + 1, 1);
          } else if (
            data[i].includes('platforms: [') &&
            data[i + 2].includes("'ios'")
          ) {
            data.splice(i + 2, 1);
          } else if (
            data[i].includes('platforms: [') &&
            data[i + 3].includes("'ios'")
          ) {
            data.splice(i + 3, 1);
          } else if (
            data[i].includes('platforms: [') &&
            data[i + 4].includes("'ios'")
          ) {
            data.splice(i + 4, 1);
          } else if (
            data[i].includes('platforms: [') &&
            data[i + 5].includes("'ios'")
          ) {
            data.splice(i + 5, 1);
          } else if (
            data[i].includes('platforms: [') &&
            data[i + 6].includes("'ios'")
          ) {
            data.splice(i + 6, 1);
          } else if (
            data[i].includes('platforms: [') &&
            data[i + 7].includes("'ios'")
          ) {
            data.splice(i + 7, 1);
          } else if (
            data[i].includes('platforms: [') &&
            data[i + 8].includes("'ios'")
          ) {
            data.splice(i + 8, 1);
          } else if (
            data[i].includes('platforms: [') &&
            data[i + 9].includes("'ios'")
          ) {
            data.splice(i + 9, 1);
          } else if (
            data[i].includes('platforms: [') &&
            data[i + 10].includes("'ios'")
          ) {
            data.splice(i + 10, 1);
          } else if (
            data[i].includes('platforms: [') &&
            data[i + 11].includes("'ios'")
          ) {
            data.splice(i + 11, 1);
          } else if (
            data[i].includes('platforms: [') &&
            data[i + 12].includes("'ios'")
          ) {
            data.splice(i + 12, 1);
          }
        }

        newContent = data.join('\n');

        // if (data != newContent) {
        //   console.log(page);
        // }

        fs.writeFile(page, newContent, (err) => {
          if (err) {
            console.log('[ ERROR WRITING CONTENT ]', page, err);
          } else if (data != newContent) {
            console.log('[ SUCCESS: PLATFORM EDITS WRITTEN ]', page);
          }
        });
      }
    });
  });
};

const generateDirectory = function () {
  const testOutput = '/src/directory/test.mdx';

  const getDirectories = (source) =>
    fs
      .readdirSync(source, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name);

  const fillDir = (dirObject, dirPath, filePath) => {
    //first look for index.tsx or index.mdx
    let fileType = 'index.tsx';
    if (!fs.existsSync(`${dirPath}${fileType}`)) {
      fileType = 'index.mdx';
      if (!fs.existsSync(`${dirPath}${fileType}`)) {
        //   console.log(`${filePath}${fileType} not found should I create it?`);
        let route = filePath.replace('src/pages', '').slice(0, -1);
        let title = route.split('/').slice(-1)[0].replaceAll('-', ' ');
        title = titleCase(title);
        //   console.log(`Title: ${title} Route: ${route}`);
        let fileLocation = `${dirPath}${fileType}`;
        // writeFile(fileLocation, createIndex(title, route));
      }
    }
    dirObject.path = `${filePath}${fileType}`;
    const children = getDirectories(dirPath);
    if (children.length) {
      dirObject.children = [];
    }
    children.forEach((childName) => {
      let childObj = {};
      const childDir = `${dirPath}${childName}/`;
      const childFile = `${filePath}${childName}/`;
      fillDir(childObj, childDir, childFile);
      dirObject.children.push(childObj);
    });
  };

  const titleCase = (str) => {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] =
        splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  };

  const createIndex = (title, route) => {
    return `
  import { getCustomStaticPath } from '@/utils/getCustomStaticPath';
  import { getChildPageNodes } from '@/utils/getChildPageNodes';
  import directory from 'src/directory/directory.json';

  export const meta = {
      title: '${title}',
      description: '${title}',
      platforms: [
      'android',
      'angular',
      'flutter',
      'javascript',
      'nextjs',
      'react',
      'react-native',
      'swift',
      'vue'
      ],
      route: '${route}'
  };

  export const getStaticPaths = async () => {
      return getCustomStaticPath(meta.platforms);
  };

  export function getStaticProps(context) {
      const childPageNodes = getChildPageNodes(meta.route);
      return {
      props: {
          platform: context.params.platform,
          meta,
          childPageNodes
      }
      };
  }

  # ${title}

  <Overview childPageNodes={props.childPageNodes} />

  `;
  };

  const writeFile = (filePath, content) => {
    fs.writeFile(filePath, content, (err) => {
      if (err) {
        console.error(err);
      }
      // file written successfully
    });
  };

  let dirPath = 'src/pages/';
  let filePath = 'src/pages/';

  let dirObject = {};

  fillDir(dirObject, dirPath, filePath);

  const output = 'src/directory/directory2.txt';
  // console.log(dirObject);

  writeFile(output, JSON.stringify(dirObject));

  console.log(dirObject);

  //need to manually add the UI docs external entry after running this
};

//  add platforms in meta
const addAddtlJSPlatformsToMeta = function () {
  let pages = globSync('src/pages/**/*.mdx');
  pages = pages.filter((path) => {
    return (
      !path.includes('src/pages/gen2') &&
      !path.includes('src/pages/[platform]/start')
    );
  });

  pages.forEach((file) => {
    fs.readFile(file, 'utf8', (err, dataString) => {
      if (err) {
        console.log('[ ERROR READING PAGE:  ]', file, err);
      } else {
        let data = dataString.split('\n');
        for (let i = 0; i < data.length; i++) {
          if (data[i] == '  platforms: [') {
            let closeBracketIndex;
            if (data[i + 1].includes(']') && !data[i + 1].includes('route'))
              closeBracketIndex = i + 1;
            if (data[i + 2].includes(']') && !data[i + 2].includes('route'))
              closeBracketIndex = i + 2;
            if (data[i + 3].includes(']') && !data[i + 3].includes('route'))
              closeBracketIndex = i + 3;
            if (data[i + 4].includes(']') && !data[i + 4].includes('route'))
              closeBracketIndex = i + 4;
            if (data[i + 5].includes(']') && !data[i + 5].includes('route'))
              closeBracketIndex = i + 5;
            if (data[i + 6].includes(']') && !data[i + 6].includes('route'))
              closeBracketIndex = i + 6;
            if (data[i + 7].includes(']') && !data[i + 7].includes('route'))
              closeBracketIndex = i + 7;
            if (data[i + 8].includes(']') && !data[i + 8].includes('route'))
              closeBracketIndex = i + 8;
            if (data[i + 9].includes(']') && !data[i + 9].includes('route'))
              closeBracketIndex = i + 9;
            if (data[i + 10].includes(']') && !data[i + 10].includes('route'))
              closeBracketIndex = i + 10;
            if (data[i + 11].includes(']') && !data[i + 11].includes('route'))
              closeBracketIndex = i + 11;
            if (data[i + 12].includes(']') && !data[i + 12].includes('route'))
              closeBracketIndex = i + 12;

            const platforms = data.slice(i + 1, closeBracketIndex);
            const platformArr = [];
            platforms.forEach((platform) => {
              platform = platform
                .replaceAll('"', '')
                .replaceAll("'", '')
                .replaceAll('.', '')
                .replaceAll(',', '')
                .replaceAll(']', '')
                .replaceAll(' ', '');
              platformArr.push(platform);
            });

            if (
              platformArr.includes('javascript') &&
              (!platformArr.includes('angular') ||
                !platformArr.includes('nextjs') ||
                !platformArr.includes('react') ||
                !platformArr.includes('vue'))
            ) {
              platformArr.push('angular', 'nextjs', 'react', 'vue');
              console.log('NEED TO DEAL WITH THIS');
            }
          } else if (
            data[i].startsWith('  platforms: [') &&
            data[i].includes('javascript') &&
            (!data[i].includes('angular') ||
              !data[i].includes('nextjs') ||
              !data[i].includes('react') ||
              !data[i].includes('vue'))
          ) {
            console.log(file);
            data[i] = data[i].slice(data[i].indexOf('[') + 1, -1);
            data[i] = data[i].split(',');
            data[i].push("'angular'", "'nextjs'", "'react'", "'vue'");
            data[i] = data[i].filter((value, index) => {
              return data[i].indexOf(value) === index;
            });
            data[i] = '  platforms: [' + data[i].join(',') + '] ';

            const newContent = data.join('\n');

            fs.writeFile(file, newContent, (err) => {
              if (err) {
                console.log('[ ERROR WRITING CONTENT ]', file, err);
              } else if (data != newContent) {
                console.log('[ SUCCESS: PLATFORM EDITS WRITTEN ]', file);
              }
            });
          }
        }
      }
    });
  });
};

// add platforms in fragments and inlineFilters
const addAddtlJSPlatformsToFragmentsInlineFilters = function () {
  let pages = globSync('src/pages/**/*.mdx');
  pages = pages.filter((path) => {
    return (
      !path.includes('src/pages/gen2') &&
      !path.includes('src/pages/[platform]/start')
    );
  });

  pages.forEach((file) => {
    fs.readFile(file, 'utf8', (err, dataString) => {
      if (err) {
        console.log('[ ERROR READING PAGE:  ]', file, err);
      } else {
        let data = dataString.split('\n');
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].startsWith('<Fragments fragments={{') &&
            data[i].includes('javascript:') &&
            (!data[i].includes('angular:') ||
              !data[i].includes('nextjs:') ||
              !data[i].includes('react:') ||
              !data[i].includes('vue:'))
          ) {
            let fragments = data[i].slice(
              data[i].indexOf('{{') + 2,
              data[i].indexOf('}}')
            );
            fragments = fragments.split(',');
            // console.log(fragments);
            fragments.forEach((fragment) => {
              if (fragment.includes('javascript:')) {
                fragment = fragment.replaceAll(' ', '');
                let fileRef = fragment.slice(fragment.indexOf(':') + 1);
                fileRef = fileRef.replaceAll(' ', '');
                // console.log(fragments);
                // fragments.splice(fragments[fragment], 1);
                // console.log(fragments[fragment]);
                // console.log('pre', fragments);
                fragments.push(
                  // `javascript: ${fileRef}`,
                  `angular: ${fileRef}`,
                  `nextjs: ${fileRef}`,
                  `react: ${fileRef}`,
                  `vue: ${fileRef}`
                );
                console.log('post', fragments);

                fragments = fragments.filter((value, index) => {
                  return fragments.indexOf(value) === index;
                });
              }
            });
            fragments = fragments.join(', ');
            data[i] = '<Fragments fragments={{ ' + fragments + ' }} />';
          } else if (
            data[i].startsWith('<InlineFilter filters={[') &&
            data[i].includes('javascript') &&
            (!data[i].includes('angular') ||
              !data[i].includes('nextjs') ||
              !data[i].includes('react') ||
              !data[i].includes('vue'))
          ) {
            let filters = data[i].slice(
              data[i].indexOf('{[') + 2,
              data[i].indexOf(']}')
            );
            filters = filters.split(',');
            filters.push('"angular"', '"nextjs"', '"react"', '"vue"');
            filters = filters.join(', ');
            data[i] = '<InlineFilter filters={[' + filters + ']}>';
          }
        }
        const newContent = data.join('\n');
        fs.writeFile(file, newContent, (err) => {
          if (err) {
            console.log('[ ERROR WRITING CONTENT ]', file, err);
          } else if (data != newContent) {
            console.log('[ SUCCESS: PLATFORM EDITS WRITTEN ]', file);
          }
        });
      }
    });
  });
};

const replaceOldLinks = function () {
  let pages = globSync('src/pages/**/*.mdx');
  let fragments = globSync('src/fragments/**/*.mdx');
  const redirectLinks = [];
  const fragmentLinks = [];

  // create redirectLinks array of the from/to paths from the migration data
  migrationData.forEach((instance) => {
    let start;
    start = instance['Original backend source'].slice(
      13,
      instance['Original backend source'].indexOf('.')
    );

    let variable;

    if (instance['Original backend source'].includes('/q/')) {
      variable = instance['Original backend source'].slice(
        instance['Original backend source'].indexOf('/q/'),
        instance['Original backend source'].indexOf('.mdx')
      );
    }

    let dest;
    if (instance['New backend source'].includes('[platform]')) {
      dest = instance['New backend source'].slice(9);
      if (dest.includes('/index.')) {
        dest = dest.slice(0, dest.indexOf('/index.'));
      } else if (dest.includes('.tsx') || dest.includes('.mdx')) {
        dest = dest.slice(0, dest.indexOf('.'));
      }
    }

    const d = {
      from: start,
      plat: variable,
      to: dest + '/'
    };

    redirectLinks.push(d);
  });

  // find and replace all links in fragments
  pages.forEach((file) => {
    fs.readFile(file, 'utf8', (err, dataString) => {
      if (err) {
        console.log('[ ERROR READING PAGE:  ]', file, err);
      } else {
        let data = dataString.split('\n');
        for (let i = 0; i < data.length; i++) {
          let base;
          let anchor;
          let plat;

          if (data[i].includes('](/')) {
            let prevLink;
            let freshLink;
            // console.log('before: ', data[i]);
            // get array of all links in line
            let count = data[i].split('](');

            // for every link
            for (let i = 1; i < count.length; i++) {
              let link = count[i].slice(0, count[i].indexOf(')'));
              if (link.startsWith('/') && !link.startsWith('/images')) {
                if (link.startsWith('/start') && !link.includes('/q/')) {
                  base = link;
                  plat = '/q/integration/[integration]';
                } else if (
                  !link.startsWith('/cli') &&
                  link.includes('#') &&
                  !link.includes('/q/')
                ) {
                  base = link.slice(0, link.indexOf('#'));
                  plat = '/q/platform/[platform]';
                  anchor = link.slice(link.indexOf('#'));
                } else if (
                  !link.startsWith('/cli') &&
                  link.includes('#') &&
                  link.includes('/q/')
                ) {
                  base = link.slice(0, link.indexOf('/q/'));
                  anchor = link.slice(link.indexOf('#'));
                  plat = link.slice(link.indexOf('/q/'), link.indexOf('#'));
                } else if (
                  !link.startsWith('/cli') &&
                  !link.includes('#') &&
                  link.includes('/q/')
                ) {
                  base = link.slice(0, link.indexOf('/q/'));
                  anchor = link.slice(link.indexOf('#'));
                  plat = link.slice(link.indexOf('/q/'), link.indexOf('#'));
                } else if (
                  !link.includes('#') &&
                  !link.includes('/q/') &&
                  !link.startsWith('/cli')
                ) {
                  base = link;
                  plat = '/q/platform/[platform]';
                } else if (link.startsWith('/cli') && link.includes('#')) {
                  base = link.slice(0, link.indexOf('#'));
                  anchor = link.slice(link.indexOf('#'));
                } else {
                  base = link;
                }
                const inContent = {
                  base: base,
                  plat: plat,
                  anchor: anchor
                };
                if (inContent.plat != undefined) {
                  if (inContent.base[inContent.base.length - 1] == '/') {
                    inContent.base = inContent.base.slice(
                      0,
                      inContent.base.length - 1
                    );
                  }
                  linkToChange = inContent.base + inContent.plat;
                } else {
                  linkToChange = inContent.base;
                }

                const linkNoAnchor = link.includes('#')
                  ? link.slice(0, link.indexOf('#'))
                  : link;

                const hash = link.includes('#')
                  ? link.slice(link.indexOf('#'))
                  : null;

                // console.log(hash);
                // console.log('original link: ', link);
                // console.log('   link w/o #: ', linkNoAnchor);

                const k = {
                  origLink: linkNoAnchor,
                  plat: inContent.plat,
                  anchor: hash,
                  newLink: ''
                };

                redirectLinks.forEach((instruction) => {
                  if (k.origLink[k.origLink.length - 1] == '/') {
                    k.origLink = k.origLink.slice(0, k.origLink.length - 1);
                  }
                  if (
                    !k.origLink.startsWith('/[platform]') &&
                    !k.origLink.startsWith('/gen2')
                  ) {
                    if (instruction.from == k.origLink) {
                      k.newLink = instruction.to;
                    } else if (
                      k.plat &&
                      k.plat.includes('platform') &&
                      !k.plat.includes('[platform]')
                    ) {
                      const revLink =
                        k.origLink.slice(
                          0,
                          k.origLink.indexOf('/q/platform/') + 12
                        ) + '[platform]';
                      // console.log('orig: ', k.origLink);
                      // console.log(' rev: ', revLink);
                      if (instruction.from == revLink) {
                        k.newLink = instruction.to;
                      }
                      // console.log('instruction: ', instruction.from);
                      // console.log(' k.origLink: ', k.origLink);
                    } else if (
                      k.plat &&
                      k.plat.includes('integration') &&
                      !k.plat.includes('[integration]')
                    ) {
                      const revLink =
                        k.origLink.slice(
                          0,
                          k.origLink.indexOf('/q/integration/') + 15
                        ) + '[integration]';
                      // console.log('orig: ', k.origLink);
                      // console.log(' rev: ', revLink);
                      if (instruction.from == revLink) {
                        k.newLink = instruction.to;
                      }
                      // console.log('instruction: ', instruction.from);
                      // console.log(' k.origLink: ', k.origLink);
                    } else if (k.plat) {
                      let combined = k.origLink + k.plat;
                      if (combined.includes('//')) {
                        combined = combined.replaceAll('//', '/');
                      }
                      if (instruction.from == combined) {
                        k.newLink = instruction.to;
                      }
                    }
                  }
                });

                if (k.anchor) {
                  k.newLink = k.newLink + anchor;
                }

                if (
                  !k.origLink.startsWith('/[platform]') &&
                  !k.origLink.startsWith('/gen2') &&
                  k.newLink == ''
                ) {
                  console.log(k);
                }

                prevLink = link;
                freshLink = k.newLink;

                // console.log('old: ', link);
                // console.log('new: ', k.newLink);
              }
            }
            // console.log('prevLink', prevLink);
            // console.log('freshLink', freshLink);

            data[i] = data[i].replace(prevLink, freshLink);
          }
        }
        // const newContent = data.join('\n');
        // fs.writeFile(file, newContent, (err) => {
        //   if (err) {
        //     console.log('[ ERROR WRITING CONTENT ]', file, err);
        //   } else if (data != newContent) {
        //     console.log('[ SUCCESS: PLATFORM EDITS WRITTEN ]', file);
        //   }
        // });
      }
    });
  });
};

const checkForBrokenLinks = function () {
  let pages = globSync('src/pages/**/*.mdx');
  let fragments = globSync('src/fragments/**/*.mdx');
  let linkList = [];

  pages.forEach((path) => {
    const link = path.slice(9, path.indexOf('/index.mdx'));
    linkList.push(link);
  });

  pages.forEach((file) => {
    fs.readFile(file, 'utf8', (err, dataString) => {
      if (err) {
        console.log('[ ERROR READING PAGE:  ]', file, err);
      } else {
        let data = dataString.split('\n');
        for (let i = 0; i < data.length; i++) {
          if (data[i].includes('](/')) {
            let count = data[i].split('](');
            for (let i = 1; i < count.length; i++) {
              let link = count[i].slice(0, count[i].indexOf(')'));
              if (!link.startsWith('/images')) {
                if (link.includes('#')) {
                  link = link.slice(0, link.indexOf('#'));
                }
                // console.log(link[link.length - 1] == '/');
                if (link[link.length - 1] == '/') {
                  link = link.slice(0, link.length - 1);
                }
                if (!linkList.includes(link)) {
                  console.log('file: ', file);
                  // console.log('list: ', linkList[link]);
                  console.log('link: ', link);
                }
              }
            }
          }
        }
      }
    });
  });
};

// STEPS
// checkout next-release/main and pull most recent changes from remote
// create a branch for migration from next-release/main
// checkout amplify_V6_branch and pull most recent changes from remote
// change 'pages' directory to 'pages-old'
// checkout migration branch
// cleanupPagesFiles()
// cleanupPagesDirectories()
// remove children of src/pages/[platform]/index.mdx from directory.mjs
// git checkout amplify_V6_branch -- src/pages-old
// git checkout amplify_V6_branch -- src/fragments
// cleanupPagesOld()
// updatePageContent()
// make note of errors
// movePages()
// make note of errors
// fixTics()
// checkForAddtlPlatforms()
// commit changes and correct any 'unknown word' errors
// run yarn build and fix errors surfaced

// addAddtlJSPlatformsToMeta();
// addAddtlJSPlatformsToFragmentsInlineFilters();
replaceOldLinks();
// checkForBrokenLinks();
