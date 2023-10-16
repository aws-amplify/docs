module.exports = (async () => {
  const { visit } = await import('unist-util-visit');

  const internalLinkPlugin = () => (tree) => {
    visit(tree, 'link', (link, index, parent) => {
      let { url } = link;
      const { children } = link;

      if (url.includes(':') && !url.includes('//docs.amplify.aws')) {
        // external link

        // fix for URLs ending with "
        if (url.endsWith('"')) {
          url = url.split('"').join('');
        }

        parent.children.splice(
          index,
          1,
          ...[
            {
              type: 'jsx',
              value: `<ExternalLink href="${url}">`
            },
            ...children,
            {
              type: 'jsx',
              value: '</ExternalLink>'
            }
          ]
        );
      } else {
        // internal link
        parent.children.splice(
          index,
          1,
          ...[
            {
              type: 'jsx',
              value: `<InternalLink href="${url}"><a>`
            },
            ...children,
            {
              type: 'jsx',
              value: '</a></InternalLink>'
            }
          ]
        );
      }
    });
  };

  return internalLinkPlugin;
})();
