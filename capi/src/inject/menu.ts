import * as t from "../types";
import * as path from "path";
import {createPageLink} from "../utils";

/**
 * iterates through all pages who should have a menu, stitches together
 * their menus, and injects them in place into the page obj
 */
export const injectMenu = (ctx: t.Ctx): void => {
  // for every product directory
  ctx.productDirs.forEach((productDir) => {
    // get the pages to whom the menu applies
    const menuForPaths = ctx.pageSrcPaths.filter((path) =>
      path.startsWith(productDir),
    );

    // get the written menu object or throw an error if it doesn't exist
    const productDirMenuPath = path.join(productDir, "menu.json");
    const productDirMenu = ctx.menuBySrcPath.get(productDirMenuPath);
    if (!productDirMenu) {
      throw new Error(`Create a "${productDirMenuPath}" file.`);
    }

    // construct the menu, ... or throw errors ;)
    const menu: t.Menu = productDirMenu.items.map((item) => {
      const nestedMenuPath = path.join(productDir, item, "menu.json");
      const nestedMenu = ctx.menuBySrcPath.get(nestedMenuPath);

      if (!nestedMenu) {
        throw new Error(`Create a "${nestedMenuPath}" file.`);
      }

      if (!nestedMenu.title) {
        throw new Error(`"title" field is required in "${nestedMenuPath}"`);
      }

      return {
        title: nestedMenu.title,
        items: nestedMenu.items.map((mdFileName) => {
          // construct the `srcPath`, which we'll use to get the corresponding page obj
          const pagePath = [
            path.join(productDir, item, mdFileName),
            ".md",
          ].join("");

          // retrieve the page obj
          const page = ctx.pageBySrcPath.get(pagePath);
          if (!page) {
            throw new Error(
              `Ran into problems resolving "${pagePath}", referenced from "${nestedMenuPath}"`,
            );
          }
          page.sectionTitle = nestedMenu.title;

          // create and return the page link
          return createPageLink(page);
        }),
      };
    });

    // get the product root page link
    const productDirFolderName = productDir.split(path.sep).pop();
    const productRootPath = path.join(productDir, `${productDirFolderName}.md`);
    const productRootPage = ctx.pageBySrcPath.get(productRootPath);
    if (!productRootPage) {
      throw new Error(`Create a "${productRootPath}" file.`);
    }
    const productRootPageLink = createPageLink(productRootPage);

    // add the menu to the product subpages, ... or throw an error ;)
    menuForPaths.forEach((pagePath) => {
      const page = ctx.pageBySrcPath.get(pagePath);
      if (!page) {
        throw new Error(`Ran into problems resolving "${pagePath}".`);
      }
      page.menu = menu;
      page.productRootLink = productRootPageLink;
    });
  });
};
