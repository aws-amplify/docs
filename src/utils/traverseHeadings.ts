import {headerNames, propsAreEmptyByTag} from "../components/UiComponentProps";
import featureFlagsJson from "../components/FeatureFlags/feature-flags.json";

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
      } else if ("all" in node.props.fragments) {
        // "all" includes every filterKey, so recurse
        const fragmentFunction = node.props.fragments.all;
        const fragment = fragmentFunction([]); // expand function into full tree
        headings = headings.concat(traverseHeadings(fragment, filterKey));
      }
    } else if ("children" in node.props) {
      // Recurse on the children, _unless_ this is a FilterContent with a
      // filter that doesn't match the current filterKey
      if (node.props.mdxType === "FilterContent") {
        let filterContentFilter;
        if ("framework" in node.props)
          filterContentFilter = node.props.framework;
        if ("integration" in node.props)
          filterContentFilter = node.props.integration;
        if ("platform" in node.props) filterContentFilter = node.props.platform;
        if (filterContentFilter === filterKey) {
          headings = headings.concat(
            traverseHeadings(node.props.children, filterKey),
          );
        }
      } else {
        headings = headings.concat(
          traverseHeadings(node.props.children, filterKey),
        );
      }

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
      if (!("useTableHeaders" in node.props) || !node.props.useTableHeaders)
        continue;
      const sectionId = `props-${propType}-${tag}`;
      headings.push([headerNames[propType], sectionId, "h2"]);
    } else if (node.props.mdxType === "FeatureFlags") {
      // FeatureFlags is special -- just grab the headers from the feature-flags JSON file
      for (const key in featureFlagsJson) {
        headings.push([key, key, "h2"]);
        const features = featureFlagsJson[key].features;
        for (const feature in features) {
          headings.push([feature, feature, "h3"]);
        }
      }
    }
  }
  return headings;
}
