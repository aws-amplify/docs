import * as t from "../types";
import {getPathsOfDepth, createPageLink} from "../utils";

const operationByDirection = {
  previous: (i: number): number => (i -= 1),
  next: (i: number): number => (i += 1),
};

/**
 * lets us find the nearest link whose route page is available
 * in a specific filter
 */
const findNearestSiblingWithFilter = (
  items: t.PageLink[],
  i: number,
  filterKey: string,
  filterValue: string,
  direction: t.Direction,
): t.PageLink | undefined => {
  const item = items[i];
  if (item) {
    if (item.filters) {
      const filterValues = item.filters[filterKey];
      return filterValues && filterValues.includes(filterValue)
        ? item
        : findNearestSiblingWithFilter(
            items,
            operationByDirection[direction](i),
            filterKey,
            filterValue,
            direction,
          );
    } else {
      return item;
    }
  }
};

/**
 * gives us the potentially-filter-specific next & previous `PageLink`s for each page
 */
export const injectNextAndPreviousLinks = (ctx: t.Ctx): void => {
  // get start section root page
  const [startRootPath] = getPathsOfDepth(
    ctx.pageSrcPaths,
    ctx.contentDirDepth + 2,
  ).filter((path) => path.includes("start"));
  const startPage = ctx.pageBySrcPath.get(startRootPath);

  // get product subpage source paths (`~/lib/auth/overview.md`, for instance)
  const productSubpagePaths = getPathsOfDepth(
    ctx.pageSrcPaths,
    ctx.contentDirDepth + 3,
  );

  // for each of 'em...
  productSubpagePaths.forEach((path) => {
    // get access to all the page data
    const currentProductSubpage = ctx.pageBySrcPath.get(path);
    if (currentProductSubpage) {
      if (
        startPage &&
        currentProductSubpage.route.includes(
          "start/getting-started/installation",
        )
      ) {
        currentProductSubpage.previous = createPageLink(startPage);
      }

      /**
       * if the current product section has filters enabled, we'll need to get
       * next & previous links for each filter respectively
       */
      const filterKey = currentProductSubpage.filterKey;
      const filters = filterKey && ctx.config.filters[filterKey];

      /**
       * route is the data point we'll use to compare to items within its menu
       * as we iterate through, looking for the point of reference, from which
       * we get the next and previous items
       */
      const {route, menu} = currentProductSubpage;
      if (menu) {
        for (const menuGroupI in menu) {
          const menuGroup = menu[menuGroupI];
          const {items} = menuGroup;
          for (const menuItemI in items) {
            const menuItem = menuGroup.items[menuItemI];
            if (menuItem.route === route) {
              // if the above condition is met, we have our point of reference!
              const parsedMenuItemI = parseInt(menuItemI);
              const previousMenuItemI = parsedMenuItemI - 1;
              const nextMenuItemI = parsedMenuItemI + 1;

              const steps: {
                direction: t.Direction;
                startI: number;
              }[] = [
                {direction: "previous", startI: previousMenuItemI},
                {direction: "next", startI: nextMenuItemI},
              ];

              steps.forEach(({direction, startI}) => {
                if (filterKey && filters) {
                  /**
                   * we have to cast `Object.assign` calls when arguments are provided
                   * dynamically (it's non-inferrable)
                   */
                  const links: Record<string, t.PageLink> = Object.assign(
                    {},
                    ...filters.map((option) => {
                      return {
                        [option]: findNearestSiblingWithFilter(
                          items,
                          startI,
                          filterKey,
                          option,
                          direction,
                        ),
                      };
                    }),
                  );
                  if (Object.values(links).filter(Boolean).length > 0) {
                    currentProductSubpage[direction] = links;
                  }
                } else if (items[startI]) {
                  currentProductSubpage[direction] = items[startI];
                }
              });
            }
          }
        }
      }
    }
  });
};
