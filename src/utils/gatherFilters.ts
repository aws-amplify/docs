const addFilters = function(filters, newFilters) {
  for (const filter in newFilters) {
    if (!(filter in filters)) filters.push(filter);
  }
};

export function gatherFilters(tree): string[] {
  if (!Array.isArray(tree)) {
    tree = [tree];
  }

  const filters = [];
  for (const node of tree) {
    if (typeof node !== "object") continue;
    if (!("props" in node)) continue;

    if ("fragments" in node.props) {
      // Recurse on the fragment corresponding to this page's platform
      for (const platform in node.props.fragments) {
        const fragmentFunction = node.props.fragments[platform];
        filters.push(platform);
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
