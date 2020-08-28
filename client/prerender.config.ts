import {PrerenderConfig} from "@stencil/core";
import {routes as entryUrls} from "./src/api/routes";

export const config: PrerenderConfig = {
  crawlUrls: false,
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
      maxHydrateCount: 2000,
      runtimeLogging: true,
      timeout: 1000000,
    };
  },
  filterUrl(url) {
    return !!(url && entryUrls.includes(url.pathname) && url.pathname !== "/");
  },
};
