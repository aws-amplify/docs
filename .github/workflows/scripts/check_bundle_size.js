module.exports = {
  checkBaseBundleSize: () => {
    const fs = require('fs');
    const jsonString = fs.readFileSync('.github/analyze/bundles.json');
    const data = JSON.parse(jsonString);
    const pagesToCheck = [
      '/',
      '/cli/start/install',
      '/lib/auth/getting-started/q/platform/[platform]',
      '/start',
      '/cli'
    ];
    const baseBundleSizes = [];
    data.pages.filter((page) => {
      if (pagesToCheck.includes(page.label)) {
        baseBundleSizes.push({
          page: page.label,
          gzipSize: page.gzipSize,
          parsedSize: page.parsedSize,
          statSize: page.statSize,
          totalGzipSize: page.totalGzipSize,
          totalParsedSize: page.totalParsedSize,
          totalStatSize: page.totalStatSize
        });
      }
    });
    return baseBundleSizes;
  },

  checkHeadBundleSize: () => {
    const fs = require('fs');
    const jsonString = fs.readFileSync('.github/analyze/bundles.json');
    const data = JSON.parse(jsonString);
    const pagesToCheck = [
      '/',
      '/cli/start/install',
      '/lib/auth/getting-started/q/platform/[platform]',
      '/start',
      '/cli'
    ];
    const headBundleSizes = [];
    data.pages.filter((page) => {
      if (pagesToCheck.includes(page.label)) {
        headBundleSizes.push({
          page: page.label,
          gzipSize: page.gzipSize,
          parsedSize: page.parsedSize,
          statSize: page.statSize,
          totalGzipSize: page.totalGzipSize,
          totalParsedSize: page.totalParsedSize,
          totalStatSize: page.totalStatSize
        });
      }
    });
    return headBundleSizes;
  },

  compareBundles: (baseBundles, headBundles) => {
    for (let i = 0; i < baseBundles.length; i++) {
      console.log(
        baseBundles[i].page,
        baseBundles[i].parsedSize,
        headBundles[i].parsedSize
      );
      if (baseBundles[i] !== headBundles[i]) {
        if (baseBundles[i].parsedSize * 1.05 < headBundles[i].parsedSize) {
          console.log(
            'bundle size math',
            baseBundles[i].parsedSize * 1.05,
            baseBundles[i].parsedSize * 1.05 < headBundles[i].parsedSize
          );
          return false;
        }
      }
    }
  }
};
