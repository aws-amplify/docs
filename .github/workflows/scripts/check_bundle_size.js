module.exports = {
  checkBundleSize: () => {
    console.log('are you there god, its me, console.log')
    const fs = require('fs');
    const jsonString = fs.readFileSync('.github/analyze/bundles.json');
    const data = JSON.parse(jsonString);
    const pagesToCheck = [
      '/',
      '/[platform]/tools/cli/start/set-up-cli',
      '/[platform]/build-a-backend/auth/set-up-auth',
      '/[platform]/start',
      '/[platform]/tools/cli'
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
    console.log(bundleSizes)
    return bundleSizes;
  },

  compareBundles: (baseBundles, headBundles) => {
    const fails = [];
    baseBundles.forEach((basePage) => {
      headBundles.forEach((headPage) => {
        if (
          basePage.page == headPage.page &&
          basePage.parsedSize < headPage.parsedSize
        ) {
          const fail = {
            page: basePage.page,
            baseSize: basePage.parsedSize,
            headSize: headPage.parsedize
          }
          fails.push(fail);
        }
      });
    });

    if (fails.length > 0) {
      console.log(
        `The bundle size of ${fails.page} increased from ${fails.baseSize} to ${fails.headSize} with this PR`
      );
    }
    return fails.length;
  }
};
