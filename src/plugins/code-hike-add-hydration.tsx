module.exports = (async () => {
  const { visit, SKIP } = await import('unist-util-visit');

  const codeHikeAddHydrationPlugin = () => (tree) => {
    // wrap any CH. component in a <Hydrate> component which waits until after
    // rendering begins to show the code block.  this fixes the hydration
    // client/server mismatch error.  can be applied to other components as well
    visit(tree, (node) => {
      // need to modify the node's children -- modifying a particular node in-
      // place doesn't work (mdx v2 change?)
      if (node.children) {
        for (let i = 0; i < node.children.length; ++i) {
          const child = node.children[i];
          if (child.name && child.name.startsWith('CH.')) {
            const copy = Object.assign({}, child);
            child.name = 'Hydrate';
            child.children = [copy];
          }
        }
      }
      return SKIP;
    });
  };

  return codeHikeAddHydrationPlugin;
})();
