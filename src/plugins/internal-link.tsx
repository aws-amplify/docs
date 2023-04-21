module.exports = (async () => {
  const { visit } = await import('unist-util-visit');

  const internalLinkPlugin = () => (tree) => {
    visit(tree, 'link', (link, index, parent) => {
      let { url } = link;
      const { children } = link;
      let attr = link.attributes || {};
      attr.href = url;

      if (url.includes(':') && !url.includes('docs.amplify.aws')) {
        // external link

        // fix for URLs ending with "
        if (url.endsWith('"')) {
          url = url.split('"').join('');
        }

        const externalLink = {
          name: 'ExternalLink',
          type: 'mdxJsxFlowElement',
          data: {
            _mdxExplicitJsx: true
          },
          attributes: attr,
          children: children
        };
        parent.children = [externalLink];

        // parent.children.splice(
        //   index,
        //   1,
        //   ...[
        //     {
        //       type: 'jsx',
        //       value: `<ExternalLink href="${url}">`
        //     },
        //     ...children,
        //     {
        //       type: 'jsx',
        //       value: '</ExternalLink>'
        //     }
        //   ]
        // );
      } else {
        // internal link

        // const internalLink = {
        //   name: 'InternalLink',
        //   type: 'mdxJsxFlowElement',
        //   data: {
        //     _mdxExplicitJsx: true
        //   },
        //   attributes: attr,
        //   children: children
        // };
        // parent.children = [internalLink];
        const node = {
          type: 'mdxjsEsm',
          value: `<InternalLink href="${url}"><a></a></InternalLink>`,
          data: {
            estree: {
              type: 'Program',
              body: [
                {
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'JSXElement',
                    openingElement: {
                      type: 'JSXOpeningElement',
                      attributes: [
                        {
                          type: 'JSXAttribute',
                          name: {
                            type: 'JSXIdentifier',
                            name: 'href'
                          },
                          value: {
                            type: 'Literal',
                            value: url,
                            raw: url
                          }
                        }
                      ],
                      name: {
                        type: 'JSXIdentifier',
                        name: 'InternalLink'
                      },
                      selfClosing: false
                    },
                    closingElement: {
                      type: 'JSXClosingElement',
                      name: {
                        type: 'JSXIdentifier',
                        name: 'InternalLink'
                      }
                    },
                    children: [
                      {
                        type: 'JSXElement',
                        openingElement: {
                          type: 'JSXOpeningElement',
                          attributes: [],
                          name: {
                            type: 'JSXIdentifier',
                            name: 'a'
                          },
                          selfClosing: false
                        },
                        closingElement: {
                          type: 'JSXClosingElement',
                          name: {
                            type: 'JSXIdentifier',
                            name: 'a'
                          }
                        },
                        children: [...children]
                      }
                    ]
                  }
                }
              ],
              sourceType: 'module'
            }
          }
        };
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
