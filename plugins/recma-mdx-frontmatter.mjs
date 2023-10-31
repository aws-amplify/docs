/// <reference path="./plugins.d.ts" />
import { fromJs } from 'esast-util-from-js';
import { visit } from 'estree-util-visit';

/**
 * Plugin to pass frontmatter to getStaticProps and into MDXProvider's `wrapper`.
 * This is meant to be used alongside `remark-frontmatter`
 * @param {RecmaMdxFrontmatterOptions} options
 * @returns {import('unified').Plugin<[RecmaMdxFrontmatterOptions], import('estree').Program>} Next.js page getStaticProps with frontmatter data
 */
export function recmaMdxFrontmatter(options) {
  const { name = 'frontmatter', dynamicRoutes } = options || {};
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
          if (prop.value.type === 'ArrayExpression') {
            frontmatter[prop.key.value] = prop.value.elements
              .filter((element) => element.type === 'Literal')
              .map((element) => element.value);
          } else {
            frontmatter[prop.key.value] = prop.value.value;
          }
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
        module: true
      }
    );
    // push `getStaticProps` to end of tree
    tree.body.push(...getStaticProps.body);

    // if frontmatter contains a key for dynamic routes, we need to generate `getStaticPaths` as well
    for (const [routeParam, availableValues] of Object.entries(dynamicRoutes)) {
      if (frontmatter[routeParam]) {
        // this probably only works for the one dynamic route
        // handle whether frontmatter's value contains items not specified in this plugin's options
        if (
          frontmatter[routeParam].some(
            (value) => !availableValues.includes(value)
          )
        ) {
          throw new Error(`Found invalid frontmatter value for ${routeParam}`);
        }
        // create the getStaticPaths params
        const paths = frontmatter[routeParam].map((param) => ({
          params: { [routeParam]: param }
        }));
        // argh, the frontmatter key !== the route param :////
        console.log('paths are', paths);
        const getStaticPaths = fromJs(
          `
          export const getStaticPaths = async () => {
            return {
              paths: ${JSON.stringify(paths)},
              fallback: false,
            }
          }
          `,
          {
            module: true
          }
        );
        // push `getStaticProps` to end of tree
        tree.body.push(...getStaticPaths.body);
      }
    }
  };

  return transformer;
}

export default recmaMdxFrontmatter;
