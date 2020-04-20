// eslint-disable-next-line
const path = require("path");
const project = path.join(__dirname, "../tsconfig.json");
require("ts-node").register({project});
// eslint-disable-next-line
const {routes: entryUrls} = require("./www/api/routes");

module.exports = {
  entryUrls,
  hydrateOptions() {
    return {
      addModulePreloads: true,
      removeUnusedStyles: true,
      minifyStyleElements: true,
      minifyScriptElements: true,
      removeAttributeQuotes: true,
      removeBooleanAttributeQuotes: true,
      removeEmptyAttributes: true,
      removeHtmlComments: true,
    };
  },
};
