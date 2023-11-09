// /* eslint-disable no-console */
// /* eslint-disable @typescript-eslint/no-var-requires */
const { globSync, glob } = require('glob');
const fs = require('fs');
const reader = require('xlsx');

const addAddtlPlatformAvailabilityToJSContent = function () {
  let pages = globSync('src/pages/**/*.mdx');
  pages = pages.filter((path) => {
    return (
      !path.includes('src/pages/gen2') &&
      !path.includes('src/pages/[platform]/start')
    );
  });

  // //  add platforms in meta
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
            // console.log(platforms);
            const platformArr = [];
            platforms.forEach((platform) => {
              platform = platform
                .replaceAll('"', '')
                .replaceAll("'", '')
                .replaceAll('.', '')
                .replaceAll(',', '')
                .replaceAll(']', '')
                .replaceAll(' ', '');
              // console.log(platform);
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

  // add platforms in fragments
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
            fragments.forEach((fragment) => {
              if (fragment.includes('javascript:')) {
                fragment = fragment.replaceAll(' ', '');
                // console.log(fragment);
                let fileRef = fragment.slice(fragment.indexOf(':') + 1);
                fileRef = fileRef.replaceAll(' ', '');
                fragments.splice(fragments[fragment], 1);
                fragments.push(
                  `javascript: ${fileRef}`,
                  `angular: ${fileRef}`,
                  `nextjs: ${fileRef}`,
                  `react: ${fileRef}`,
                  `vue: ${fileRef}`
                );
              }
            });
            fragments = fragments.join(', ');
            data[i] = '<Fragments fragments={{ ' + fragments + ' }} />';
          } else if (
            data[i].startsWith('<InlineFilter filters={["') &&
            data[i].includes('javascript') &&
            (!data[i].includes('angular') ||
              !data[i].includes('nextjs') ||
              !data[i].includes('react') ||
              !data[i].includes('vue'))
          ) {
            // console.log(data[i]);
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
        console.log(newContent);
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

  // add platforms to InlineFilters
  pages.forEach((file) => {
    fs.readFile(file, 'utf8', (err, dataString) => {
      if (err) {
        console.log('[ ERROR READING PAGE:  ]', file, err);
      } else {
        let data = dataString.split('\n');
        for (let i = 0; i < data.length; i++) {
          if (
            data[i].startsWith('<InlineFilter filters={["') &&
            data[i].includes('javascript') &&
            (!data[i].includes('angular') ||
              !data[i].includes('nextjs') ||
              !data[i].includes('react') ||
              !data[i].includes('vue'))
          ) {
            // console.log(data[i]);
            let filters = data[i].slice(
              data[i].indexOf('{[') + 2,
              data[i].indexOf(']}')
            );
            filters = filters.split(',');
            filters.push('"angular"', '"nextjs"', '"react"', '"vue"');
            filters = filters.join(', ');
            data[i] = '<InlineFilter filters={[' + filters + ']}>';

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

const updateFragments = function () {};

addAddtlPlatformAvailabilityToJSContent();
// updateFragments();
