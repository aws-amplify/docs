module.exports = (async () => {
  const { visit } = await import('unist-util-visit');
  const { parse } = require('abstract-syntax-tree');

  const pagePlugin = () => (tree) => {
    visit(tree, 'mdxjsEsm', (node, index) => {
      if (node.value.includes('export const meta')) {
        // tree.children.unshift({
        //   type: 'mdxjsEsm',
        //   value:
        //     'export default ({ frontmatter, children }) => <Page frontmatter={frontmatter} meta={meta}>{children}</Page>',
        //   data: {
        //     estree: parse(
        //       'export default ({ frontmatter, children }) => <Page frontmatter={frontmatter} meta={meta}>{children}</Page>'
        //     )
        //   }
        // });
        tree.children.splice(index + 1, 0, {
          type: 'mdxjsEsm',
          value:
            'export default ({ frontmatter, children }) => <Page frontmatter={frontmatter} meta={meta}>{children}</Page>',
          data: {
            estree: {
              type: 'Program',
              body: [
                {
                  type: 'ExportDefaultDeclaration',
                  declaration: {
                    type: 'ArrowFunctionExpression',
                    id: null,
                    expression: true,
                    generator: false,
                    async: false,
                    params: [
                      {
                        type: 'ObjectPattern',
                        properties: [
                          {
                            type: 'Property',
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              name: 'frontmatter'
                            },
                            kind: 'init',
                            value: {
                              type: 'Identifier',
                              name: 'frontmatter'
                            }
                          },
                          {
                            type: 'Property',
                            method: false,
                            shorthand: true,
                            computed: false,
                            key: {
                              type: 'Identifier',
                              name: 'children'
                            },
                            kind: 'init',
                            value: {
                              type: 'Identifier',
                              name: 'children'
                            }
                          }
                        ]
                      }
                    ],
                    body: {
                      type: 'JSXElement',
                      openingElement: {
                        type: 'JSXOpeningElement',
                        attributes: [
                          {
                            type: 'JSXAttribute',
                            name: {
                              type: 'JSXIdentifier',
                              name: 'frontmatter'
                            },
                            value: {
                              type: 'JSXExpressionContainer',
                              expression: {
                                type: 'Identifier',
                                name: 'frontmatter'
                              }
                            }
                          },
                          {
                            type: 'JSXAttribute',
                            name: {
                              type: 'JSXIdentifier',
                              name: 'meta'
                            },
                            value: {
                              type: 'JSXExpressionContainer',
                              expression: {
                                type: 'Identifier',
                                name: 'meta'
                              }
                            }
                          }
                        ],
                        name: {
                          type: 'JSXIdentifier',
                          name: 'Page'
                        },
                        selfClosing: false
                      },
                      closingElement: {
                        type: 'JSXClosingElement',
                        name: {
                          type: 'JSXIdentifier',
                          name: 'Page'
                        }
                      },
                      children: [
                        {
                          type: 'JSXExpressionContainer',
                          expression: {
                            type: 'Identifier',
                            name: 'children'
                          }
                        }
                      ]
                    }
                  }
                }
              ],
              sourceType: 'module'
            }
          }
        });
        let test = tree;
      }
    });
  };

  return pagePlugin;
})();
