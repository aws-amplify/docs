module.exports = (async () => {
  const matter = require('gray-matter');
  const { visit } = await import('unist-util-visit');

  const frontmatterPlugin = () => (tree, file) => {
    // Goes through the markdown tree and builds the frontmatter
    visit(tree, 'thematicBreak', (node, index) => {
      // Only visit the 'thematicBreak' at index 0 because that's where the frontmatter will be
      if (index === 0) {
        const { data: frontmatter, content } = matter(file.contents);

        const trimContent = content.trim();
        
        tree.children.push({
          type: 'export',
          value: `export const frontmatter = ${JSON.stringify(
            frontmatter,
            null,
            2
          )}`
        });

        if (tree.children[0].type === 'thematicBreak') {
          // Find the index of the first element after the "frontmatter"
          const closingThematicBreakIndex = tree.children.findIndex(
              (element, currIndex) => {
                switch (element.type) {
                  case 'paragraph':
                  case 'heading':
                    if (element.children && element.children.length > 0) {
                      return trimContent.indexOf(element.children[0].value) > -1;
                    }
                    break;
                  case 'import':
                  case 'export':
                  case 'code':
                  case 'jsx':
                    return trimContent.indexOf(element.value) > -1;
                  case 'thematicBreak':
                    // skip
                    break;
                  default:
                    console.log('Found unhandled element type while trying to remove frontmatter: ', element.type)
                    break;
                }
            });

          if (closingThematicBreakIndex !== -1) {
            // Remove the frontmatter
            tree.children.splice(0, closingThematicBreakIndex);
          }
        }
      }
    });
  };

  return frontmatterPlugin;
})();
