import * as t from "../types";
import clone from "clone-deep";

export const docsFilter: t.Transformer = ({
  node,
  srcPath,
  lexicalScope,
  page,
}) => {
  // if the tag is "docs-filter"...
  if (Array.isArray(node) && node[0] === "docs-filter") {
    // make sure it's provided a filter prop
    const [, filters, ...children] = node;
    if (!filters) {
      throw new Error(
        ["No filters provided to `docs-filter` ", `("${srcPath}")`].join(""),
      );
    }
    const filterEntries = Object.entries(filters) as [string, string][];
    if (filterEntries.length !== 1) {
      throw new Error(
        [
          "`docs-filter` expects to be provided no more than one filter ",
          `("${srcPath}")`,
        ].join(""),
      );
    }

    // get the filter key and value
    const [[filterKey, filterValue]] = filterEntries;

    // make sure the page has a filters object, as to avoid trying to set props on undefined
    page.filters === undefined &&
      ((page.filters = {}) as Record<string, string[]>);

    // track the current page filters
    if (page.filters[filterKey] === undefined) {
      page.filters[filterKey] = [filterValue];
    } else {
      !page.filters[filterKey].includes(filterValue) &&
        page.filters[filterKey].push(filterValue);
    }

    if (children) {
      lexicalScope.update([
        "docs-filter-target",
        {filters},
        ...clone(children),
      ]);
    }
  }
};
