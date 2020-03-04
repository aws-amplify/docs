import * as t from "../types";
import * as path from "path";

const IS_URL_REGEX = /^https?:\/\//i;

const linkTags = {
  a: true,
  "amplify-card": true,
  "docs-card": true,
};

export const links: t.Transformer = ({node, srcPath, lexicalScope, ctx}) => {
  if (Array.isArray(node) && node[0] && linkTags[node[0]]) {
    const [tag, props, ...children] = node;
    if (props) {
      // eslint-disable-next-line
      // @ts-ignore
      const url = props.href || props.url;

      if (
        typeof url === "string" &&
        !IS_URL_REGEX.test(url) &&
        !url.includes("?") &&
        !url.includes("#")
      ) {
        let route: string | undefined;
        try {
          const pathDeduction = ctx.resolvePathDeduction(url, srcPath, "page");
          if (pathDeduction.route) {
            route = pathDeduction.route;
          } else if (pathDeduction.destinationPath) {
            const pieces = path
              .relative(ctx.config.outDir, pathDeduction.destinationPath)
              .split(path.sep);
            pieces.shift();
            pieces.shift();
            route = `/${pieces.join(path.sep)}`;
          }
        } catch (e) {
          console.log("\x1b[33m%s\x1b[0m", e.message.split("\n")[0]);
          route = "";
        }

        if (route) {
          lexicalScope.update([
            tag === "a" ? "docs-internal-link" : tag,
            {...props, ...(tag === "a" ? {href: route} : {url: route})},
            ...children,
          ]);
        }
      }
    }
  }
};
