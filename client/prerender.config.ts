import {PrerenderConfig} from "@stencil/core";
import {routes as entryUrls} from "./www/api/routes";

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
    };
  },
  filterUrl(url) {
    return !!(url && entryUrls.includes(url.pathname) && url.pathname !== "/");
  },
};
