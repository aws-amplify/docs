import {PrerenderConfig} from "@stencil/core";
import {routes as entryUrls} from "./src/api/routes";

export const config: PrerenderConfig = {
  crawlUrls: false,
  entryUrls,
  beforeHydrate(document: any, _) {
    document.defaultView.navigator.product = "NS";
  },
  hydrateOptions() {
    return {
      addModulePreloads: true,
      excludeComponents: ["amplify-block-switcher"],
      maxHydrateCount: 2000,
      minifyScriptElements: true,
      minifyStyleElements: true,
      removeAttributeQuotes: true,
      removeBooleanAttributeQuotes: true,
      removeEmptyAttributes: true,
      removeHtmlComments: true,
      removeUnusedStyles: true,
      runtimeLogging: true,
      timeout: 1000000,
    };
  },
  filterUrl(url) {
    return !(url && url.toString().includes("authenticator"));
  },
};
