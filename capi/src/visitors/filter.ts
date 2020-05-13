import * as t from "../types";
import clone from "clone-deep";

export const docsFilter: t.Transformer = ({
  node,
  srcPath,
  lexicalScope,
  page,
}) => {
  if (Array.isArray(node) && node[0] === "docs-filter") {
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

    const [[filterKey, filterValue]] = filterEntries;

    page.filters === undefined &&
      ((page.filters = {}) as Record<string, string[]>);

    if (page.filters[filterKey] === undefined) {
      page.filters[filterKey] = [filterValue];
    } else {
      !page.filters[filterKey].includes(filterValue) &&
        page.filters[filterKey].push(filterValue);
    }

    children &&
      lexicalScope.update([
        "docs-filter-target",
        {filters},
        ...clone(children),
      ]);
  }
};
