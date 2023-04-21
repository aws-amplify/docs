module.exports = (async () => {
  const { visit, SKIP } = await import('unist-util-visit');

  const codeHikeAddHydrationPlugin = () => (tree) => {
    visit(tree, (node) => {
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
