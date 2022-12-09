/// <reference path="./plugins.d.ts" />
import { fromJs } from 'esast-util-from-js';
import { visit } from 'estree-util-visit';

/**
 * Plugin to pass frontmatter to getStaticProps and into MDXProvider's `wrapper`
 * @returns {import('unified').Plugin<[RecmaMdxFrontmatterPluginOptions], import('estree').Program>}
 */
const recmaMdxFrontmatter = (options) => {
  const { name = 'frontmatter' } = options || {};
  /**
   * Transformer
   * @param {import('estree').Program} tree
   */
  const transformer = (tree) => {
    const frontmatter = {};
    visit(tree, (node) => {
      // look for `frontmatter` variable created by remark-mdx-frontmatter
      if (node.type === 'VariableDeclarator' && node.id.name === name) {
        if (!Array.isArray(node.init.properties)) return;
        // collect frontmatter props
        for (const prop of node.init.properties) {
          frontmatter[prop.key.value] = prop.value.value;
        }
      }
    });
    // create `getStaticProps` to feed frontmatter to MDXProvider's `wrapper`
    const getStaticProps = fromJs(
      `
      export const getStaticProps = async () => {
        return {
          props: {
            frontmatter: ${JSON.stringify(frontmatter)}
          }
        }
      }
    `,
      {
        // sourceType: 'module',
        module: true
      }
    );
    // push `getStaticProps` to end of tree
    tree.body.push(...getStaticProps.body);
  };
  return transformer;
};

export default recmaMdxFrontmatter;
