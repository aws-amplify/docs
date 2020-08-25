import * as t from "../types";
import * as path from "path";

/**
 * for every page of a filterable section, creates and injects all filtered
 * route equivalents (or the root route) into the page obj. Gives us something like
 * the following for each page:
 *
 * ```ts
 * {
 *   js: "/lib/auth/overview/q/platform/js",
 *   android: "/lib/auth/overview/q/platform/android",
 *   ios: "/lib/auth/overview/q/platform/ios"
 * }
 * ```
 */
export const injectFilteredVersionRoutes = (ctx: t.Ctx): void => {
  // for every product dir
  ctx.productDirs.forEach((productDir) => {
    // get the root md page
    const productDirPieces = productDir.split(path.sep);
    const productFolderName = productDirPieces.pop();
    if (!productFolderName) {
      throw new Error("Cannot retrieve product folder name.");
    }
    const productRootPagePath = [
      ...productDirPieces,
      productFolderName,
      `${productFolderName}.md`,
    ].join(path.sep);
    const productRootPage = ctx.pageBySrcPath.get(productRootPagePath);
    if (!productRootPage) {
      throw new Error(`Ran into problems resolving "${productRootPagePath}".`);
    }

    // from that page, collect the filter key, if it exists
    const filterKey = productRootPage.filterKey;

    if (filterKey) {
      // if there's a filter key, let's get the options list, or error out
      const filterValues = ctx.config.filters[filterKey];
      if (!filterValues) {
        throw new Error(
          `Make sure the \`filterKey\` in "${productRootPagePath}" is valid`,
        );
      }

      // for all pages...
      ctx.pageSrcPaths.forEach((srcPath) => {
        if (srcPath.startsWith(productDir)) {
          // get the given page
          const page = ctx.pageBySrcPath.get(srcPath);
          if (!page) {
            throw new Error(`Ran into problems resolving "${srcPath}".`);
          }

          /**
           * init a dictionary that maps from option value (`ios`, `js`, etc.)
           * to a link, which will be either the filtered version of the current
           * page, or the product root (in the case that a filtered version is unavailable)
           */
          const versions: Record<string, string> = {};

          // init all values of the dictionary to the root
          filterValues.forEach((filterValue) => {
            versions[
              filterValue
            ] = `${productRootPage.route}/q/${filterKey}/${filterValue}`;
          });

          // get access to which filter options are available for the given page
          const availableFilterValues = page.filters?.[filterKey];

          // if the page does in fact have filtered versions...
          if (availableFilterValues) {
            // insert a new entry in the `versions` dictionary
            availableFilterValues.forEach((filterValue) => {
              versions[
                filterValue
              ] = `${page.route}/q/${filterKey}/${filterValue}`;
            });
          }

          // if the page does not have any available versions (it's available for all)
          else {
            // insert a new entry for every option
            filterValues.forEach((filterValue) => {
              versions[
                filterValue
              ] = `${page.route}/q/${filterKey}/${filterValue}`;
            });
          }

          if (page.route.includes("/sdk")) {
            versions.js = "/lib/q/platform/js";
            versions.flutter = "/lib/q/platform/flutter";
          } else if (page.route.includes("/guides")) {
            versions.flutter = "/lib/q/platform/flutter";
          }

          // attach the `versions` and `filterKey` to the page
          page.versions = versions;
          if (srcPath !== productRootPagePath) {
            page.filterKey = filterKey;
          }
        }
      });
    }
  });
};
