import * as t from "../types";
import clone from "clone-deep";

export const fragmentTags: t.Transformer = ({
  node,
  srcPath,
  lexicalScope,
  ctx,
  page,
}) => {
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
      lexicalScope.update([
        tag,
        newProps,
        ["div", {slot: "content"}, ...clone(fragmentBody)],
      ]);
  }
};
