import {headerNames, propsAreEmptyByTag} from "../components/UiComponentProps";

export function traverseHeadings(tree, filterKey: string): string[] {
  if (!Array.isArray(tree)) {
    tree = [tree];
  }

  let headings = [];
  for (const node of tree) {
    if (typeof node !== "object") continue;
    if (!("props" in node)) continue;

    if ("fragments" in node.props) {
      // Recurse on the fragment corresponding to this page's filterKey
      if (filterKey in node.props.fragments) {
        const fragmentFunction = node.props.fragments[filterKey];
        const fragment = fragmentFunction([]); // expand function into full tree
        headings = headings.concat(traverseHeadings(fragment, filterKey));
      }
    } else if ("children" in node.props) {
      // Recurse on the children
      headings = headings.concat(
        traverseHeadings(node.props.children, filterKey),
      );

      // Is this a heading?  If so, "children" is actually the heading text
      if ("mdxType" in node.props) {
        const mdxType = node.props.mdxType;
        if (mdxType === "h2" || mdxType === "h3") {
          headings.push([node.props.children, node.props.id, mdxType]);
        }
      }
    } else if (node.props.mdxType === "UiComponentProps") {
      // UiComponentProps is special -- just grab the generated headers from the propType
      const {propType, tag} = node.props;
      if (propsAreEmptyByTag({propType, componentTag: tag})) continue;
      const sectionId = `props-${propType}-${tag}`;
      headings.push([headerNames[propType], sectionId, "h2"]);
    }
  }
  return headings;
}
