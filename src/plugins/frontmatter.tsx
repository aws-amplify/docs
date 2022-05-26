module.exports = (async () => {
  const matter = require('gray-matter');
  const { visit } = await import('unist-util-visit');

  const frontmatterPlugin = () => (tree, file) => {
    // Goes through the markdown tree and builds the frontmatter
    visit(tree, 'thematicBreak', (node, index) => {
      // Only visit the 'thematicBreak' at index 0 because that's where the frontmatter will be
      if (index === 0) {
        const { data: frontmatter, content } = matter(file.contents);

        tree.children.push({
          type: 'export',
          value: `export const frontmatter = ${JSON.stringify(
            frontmatter,
            null,
            2
          )}`
        });

        if (tree.children[0].type === 'thematicBreak') {
          // Find the index of the closing thematicBreak to "remove" the frontmatter from the mdx tree
          const closingThematicBreakIndex = tree.children.findIndex(
            (element, currIndex) => currIndex > 0 && element.type === 'thematicBreak'
          );

          if (closingThematicBreakIndex !== -1) {
            // Remove the frontmatter
            tree.children.splice(0, closingThematicBreakIndex + 1);
          }
        }
      }
    });
  };

  return frontmatterPlugin;
})();
