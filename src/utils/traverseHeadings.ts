export function traverseHeadings(tree, platform: string): string[] {
  if (!Array.isArray(tree)) {
    tree = [tree];
  }

  let headings = [];
  for (const node of tree) {
    if (typeof node !== "object") continue;
    if (!("props" in node)) continue;

    if ("fragments" in node.props) {
      // Recurse on the fragment corresponding to this page's platform
      if (platform in node.props.fragments) {
        const fragmentFunction = node.props.fragments[platform];
        const fragment = fragmentFunction([]); // expand function into full tree
        headings = headings.concat(traverseHeadings(fragment, platform));
      }
    } else if ("children" in node.props) {
      // Recurse on the children
      headings = headings.concat(
        traverseHeadings(node.props.children, platform),
      );

      // Is this a heading?  If so, "children" is actually the heading text
      if ("mdxType" in node.props) {
        const mdxType = node.props.mdxType;
        if (mdxType === "h2" || mdxType === "h3") {
          headings.push([node.props.children, mdxType]);
        }
      }
    }
  }
  return headings;
}
