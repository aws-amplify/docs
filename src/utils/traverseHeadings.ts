export function traverseHeadings(tree, filterKey: string): string[] {
  if (!Array.isArray(tree)) {
    tree = [tree];
  }
  let headings = [];
  for (const node of tree) {
    if (typeof node !== 'object') continue;
    if (!('props' in node)) continue;
    if ('mdxType' in node.props && node.props.mdxType === 'BlockSwitcher') continue; // skip parsing the BlockSwitcher, we don't want BlockSwitcher headings in the TOC

    if ('fragments' in node.props) {
      // Recurse on the fragment corresponding to this page's filterKey
      if (filterKey in node.props.fragments) {
        const fragmentFunction = node.props.fragments[filterKey];
        const fragment = fragmentFunction([]); // expand function into full tree
        headings = headings.concat(traverseHeadings(fragment, filterKey));
      } else if ('all' in node.props.fragments) {
        // "all" includes every filterKey, so recurse
        const fragmentFunction = node.props.fragments.all;
        const fragment = fragmentFunction([]); // expand function into full tree

        headings = headings.concat(traverseHeadings(fragment, filterKey));
      }
    } else if ("filters" in node.props) {
      // Recurse on the inline filters if the filter keys match
      if (node.props.filters.includes(filterKey)) {
        const inlineFilterContent = node.props.children;
        headings = headings.concat(traverseHeadings(inlineFilterContent, filterKey));
      } else if (node.props.filters?.includes("all")) {
        // "all" includes every filterKey, so recurse
        const inlineFilterContent = node.props.children;
        headings = headings.concat(traverseHeadings(inlineFilterContent, filterKey));
      }
    } else if ("children" in node.props) {
      // Recurse on the children, _unless_ this is a FilterContent with a
      // filter that doesn't match the current filterKey
      if (node.props.mdxType === 'FilterContent') {
        let filterContentFilter;
        if ('framework' in node.props)
          filterContentFilter = node.props.framework;
        if ('integration' in node.props)
          filterContentFilter = node.props.integration;
        if ('platform' in node.props) filterContentFilter = node.props.platform;
        if (filterContentFilter === filterKey) {
          headings = headings.concat(
            traverseHeadings(node.props.children, filterKey)
          );
        }
      } else if ('mdxType' in node.props) {
        const mdxType = node.props.mdxType;

        if (mdxType === 'h2' || mdxType === 'h3') {
          headings.push([node.props.children, node.props.id, mdxType]);
        } else if (mdxType === 'Accordion') {
          const children = node.props.children;

          const id = node.props.title.replace(/\s+/g, '-').toLowerCase();
          const type = node.props.headingLevel
            ? 'h' + node.props.headingLevel
            : 'div';
          if (type === 'h2' || type === 'h3') {
            headings.push([node.props.title, id, type]);
          }
        } else {
          headings = headings.concat(
            traverseHeadings(node.props.children, filterKey)
          );
        }
      } else {
        headings = headings.concat(
          traverseHeadings(node.props.children, filterKey)
        );
      }
    } else if (node.props.mdxType === 'FeatureFlags') {
      const featureFlags = node.props.originalType();

      const featureFlagHeadings = (featureFlagNodes, allHeadings) => {
        if (typeof featureFlagNodes !== 'object') return;
        if (!Array.isArray(featureFlagNodes)) {
          featureFlagNodes = [featureFlagNodes];
        }
        for (const node of featureFlagNodes) {
          if (typeof node !== 'object') continue;
          if (Array.isArray(node)) {
            //h3 headers
            for (const heading of node) {
              const name = heading.props.name;
              allHeadings.push([name, name, 'h3']);
            }
          } else if (node.type === 'h2') {
            allHeadings.push([node.props.children, node.props.id, node.type]);
          } else if (node.props.children) {
            featureFlagHeadings(node.props.children, allHeadings);
          }
        }
      };

      featureFlagHeadings(featureFlags, headings);
    }
  }
  return headings;
}
