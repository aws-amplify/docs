module.exports = (async () => {
  const { visit } = await import('unist-util-visit');

  const pagePlugin = () => (tree) => {
    visit(tree, 'export', (node, index) => {
      if (node.value.includes('export const meta')) {
        tree.children.splice(index + 1, 0, {
          type: 'export',
          default: true,
          value: `export default ({ frontmatter, children, platform, filterKind, integration }) => <Page frontmatter={frontmatter} meta={meta} platform={platform||integration} filterKind={filterKind}>{children}</Page>`
        });
      }
    });
  };

  return pagePlugin;
})();
