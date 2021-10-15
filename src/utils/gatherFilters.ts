import {filterOptionsByName} from "./filter-data";

export function gatherAllFilters(tree, filterKind): string[] {
  const filters = gatherFilters(tree);

  // if there is both filter-agnostic content and filter-gated content,
  // that indicates that all filters should be supported
  if (filters.length !== 0 && treeHasAgnosticContent(tree)) {
    addFilters(filters, filterOptionsByName[filterKind]);
  }
  // if we have no filters in a category that supports filters, that also
  // indicates that all filters should be supported
  if (filters.length === 0 && filterKind !== "") {
    addFilters(filters, filterOptionsByName[filterKind]);
  }
  return filters;
}

const treeHasAgnosticContent = function(tree): boolean {
  // If the page has content that would show on every filter, we want to add all possible filters to the list
  // ex: /guides
  if (!Array.isArray(tree)) {
    tree = [tree];
  }

  for (const node of tree) {
    if (typeof node !== "object") continue;
    if (!("props" in node)) continue;
    if (!("mdxType" in node.props)) continue;
    if (node.props.mdxType !== "Fragments") return true;
  }
  return false;
};

const addFilters = function(filters, newFilters) {
  for (const filter of newFilters) {
    if (!filters.includes(filter)) filters.push(filter);
  }
};

function gatherFilters(tree): string[] {
  if (!Array.isArray(tree)) {
    tree = [tree];
  }

  const filters = [];
  for (const node of tree) {
    if (typeof node !== "object") continue;
    if (!("props" in node)) continue;

    if ("fragments" in node.props) {
      // Recurse on the fragment corresponding to this page's filterKey
      for (const filter in node.props.fragments) {
        const fragmentFunction = node.props.fragments[filter];
        if (!filters.includes(filter) && filter !== "all") {
          filters.push(filter);
        }
        const fragment = fragmentFunction([]); // expand function into full tree
        const newFilters = gatherFilters(fragment);
        addFilters(filters, newFilters);
      }
    } else if ("children" in node.props) {
      // Recurse on the children
      const newFilters = gatherFilters(node.props.children);
      addFilters(filters, newFilters);
    }
  }
  return filters;
}
