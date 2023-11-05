/// <reference path="./recma-mdx-frontmatter.d.ts" />
import { fromJs } from 'esast-util-from-js';
import { visit } from 'estree-util-visit';

/**
 * Create `getStaticPaths` ESAST program node
 * @param {Record<string, unknown>} frontmatter
 * @param {Record<DynamicRoutePart, DynamicRouteFrontmatterConfig>} dynamicRoutes
 * @returns {import('estree').Program | null}
 */
function createGetStaticPaths(frontmatter, dynamicRoutes) {
  /** @type {[string, unknown[]][]} */
  const params = [];
  for (const [routePart, config] of Object.entries(dynamicRoutes)) {
    const key = config.key || routePart;
    const fm = frontmatter[key];
    if (fm && Array.isArray(fm)) {
      // first check to see if frontmatter contains any invalid values
      let invalidValue = undefined;
      const isContainsInvalidValue = fm.some((value) => {
        // this is a bit extra, but allows us to print a helpful error with the invalid value
        const isContainsInvalid = !config.values.includes(value);
        if (isContainsInvalid) invalidValue = value;
        return isContainsInvalid;
      });
      if (isContainsInvalidValue) {
        throw new Error(
          `Invalid value "${invalidValue}" found for frontmatter "${key}"`
        );
      }
      // then collect the getStaticPaths params
      // `["platform", ["vue", "javascript"]]`
      params.push([routePart, fm]);
    }
  }

  // exit without getSaticPaths if no dynamic route parts found
  if (!params.length) return null;

  // @TODO support a dynamic "route" or "slug" frontmatter prop to help generate multi-part params
  // this will need to be updated to support multi-part routes
  const paths = params
    .map(([routePart, values]) => {
      const getStaticPathsParams = values.map((value) => ({
        [routePart]: value
      }));
      return getStaticPathsParams.map((record) => ({ params: record }));
    })
    .flat();

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
  return getStaticPaths;
}

/**
 * Plugin to pass frontmatter to getStaticProps and into MDXProvider's `wrapper`.
 * This is meant to be used alongside `remark-frontmatter`
 * @param {RecmaMdxFrontmatterOptions} options
 * @type {import('unified').Plugin<[RecmaMdxFrontmatterOptions], import('estree').Program>}
 * @returns {(tree: import('estree').Program) => void} Next.js page getStaticProps with frontmatter data
 */
export function recmaMdxFrontmatter(options) {
  const { name = 'frontmatter', dynamicRoutes } = options || {};
  /**
   * Transformer
   * @param {import('estree').Program} tree
   */
  const transformer = (tree) => {
    /** @type {Record<string, unknown>} */
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

    if (dynamicRoutes) {
      const getStaticPaths = createGetStaticPaths(frontmatter, dynamicRoutes);
      if (getStaticPaths) tree.body.push(...getStaticPaths.body);
    }
  };

  return transformer;
}

export default recmaMdxFrontmatter;
