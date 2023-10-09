module.exports = {
  checkBundleSize: () => {
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
    const bundleSizes = [];
    data.pages.filter((page) => {
      if (pagesToCheck.includes(page.label)) {
        bundleSizes.push({
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
    return bundleSizes;
  },

  compareBundles: (baseBundles, headBundles) => {
    baseBundles.forEach((page) => {
      headBundles.forEach((prPage) => {
        if (
          page.page == prPage.page &&
          page.parsedSize * 1.05 < prPage.parsedSize
        ) {
          return true;
        }
      });
    });
  }
};
