// /* eslint-disable no-console */
// /* eslint-disable @typescript-eslint/no-var-requires */
const { globSync, glob } = require('glob');
const fs = require('fs');

const populateRedirects = function () {
  let pages = globSync('.next/server/pages/**/*.html');
  let linkList = [];

  pages.forEach((path) => {
    const link = path.slice(9, path.indexOf('/index.mdx'));
    linkList.push(link);
  });

  pages.forEach((file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.log('[ ERROR READING PAGE:  ]', file, err);
      } else {
        console.log(data)
        // let data = dataString.split('\n');
        // for (let i = 0; i < data.length; i++) {
        //   if (data[i].includes('](/')) {
        //     let count = data[i].split('](');
        //     for (let i = 1; i < count.length; i++) {
        //       let link = count[i].slice(0, count[i].indexOf(')'));
        //       if (!link.startsWith('/images')) {
        //         if (link.includes('#')) {
        //           link = link.slice(0, link.indexOf('#'));
        //         }
        //         // console.log(link[link.length - 1] == '/');
        //         if (link[link.length - 1] == '/') {
        //           link = link.slice(0, link.length - 1);
        //         }
        //         if (!linkList.includes(link)) {
        //           console.log('file: ', file);
        //           // console.log('list: ', linkList[link]);
        //           console.log('link: ', link);
        //         }
        //       }
        //     }
        //   }
        // }
      }
    });
  });
};

// STEPS
populateRedirects();
