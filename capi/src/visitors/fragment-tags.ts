import * as t from "../types";
import clone from "clone-deep";

const isPContainingFragments = function(node: t.HyperscriptNode): boolean {
  if (!Array.isArray(node)) return false;
  if (node[0] !== "p") return false;
  if (node.length < 3) return false;
  const firstChild = node[2];
  if (!Array.isArray(firstChild)) return false;
  return firstChild[0] === "inline-fragment";
};

export const fragmentTags: t.Transformer = ({
  node,
  srcPath,
  lexicalScope,
  ctx,
  page,
}) => {
  if (isPContainingFragments(node)) {
    lexicalScope.update(["div", ...node.slice(1)]);
  }
  if (Array.isArray(node) && node[0] === "inline-fragment") {
    const [, props] = node;
    if (!props || !props.src)
      throw new Error(
        ["No `src` provided to `inline-fragment` ", `("${srcPath}")`].join(""),
      );
    // eslint-disable-next-line
    // @ts-ignore
    const {src, ...filters} = props;
    if (filters) {
      const criteria = Object.entries(filters) as [string, string][];
      if (criteria.length > 0) {
        page.filters === undefined &&
          ((page.filters = {}) as Record<string, string[]>);

        criteria.forEach(([k, v]) => {
          if (page.filters) {
            if (page.filters[k] === undefined) {
              page.filters[k] = [v];
            } else {
              !page.filters[k].includes(v) && page.filters[k].push(v);
            }
          }
        });
      }
    }
    const {srcPath: referencedFragmentPath} = ctx.resolvePathDeduction(
      src as string,
      srcPath,
      "fragment",
    );
    const fragmentBody = ctx.fragmentBySrcPath.get(referencedFragmentPath);
    const [tag, newProps] =
      Object.keys(filters).length > 0
        ? ["docs-filter-target", {filters}]
        : ["div", null];
    fragmentBody &&
      lexicalScope.update([tag, newProps, ...clone(fragmentBody)]);
  }
};
