const fs = require("fs");

const mdxRenderer = `
  import { mdx } from "@mdx-js/react";

`;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const directory = require("./src/directory/directory.js");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const headingLinkPlugin = require("./src/plugins/headings.tsx");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const layoutPlugin = require("./src/plugins/layout.tsx");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const importPlugin = require("./src/plugins/import.tsx");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const codeBlockPlugin = require("./src/plugins/code-block.tsx");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const internalLinkPlugin = require("./src/plugins/internal-link.tsx");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [
      importPlugin,
      headingLinkPlugin,
      layoutPlugin,
      internalLinkPlugin,
    ],
    rehypePlugins: [codeBlockPlugin],
    renderer: mdxRenderer,
  },
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx", "tsx"],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  future: {
    webpack5: true,
  },
  exportPathMap,
});

async function exportPathMap(
  defaultPathMap,
  {dev, dir, outDir, distDir, buildId},
) {
  const pathMap = generatePathMap(directory);
  return pathMap;
}

function generatePathMap(obj, pathMap = {}) {
  for (const [_, value] of Object.entries(obj)) {
    const {items, filters, route} = value;

    if (!filters || !filters.length) {
      continue;
    }

    if (items) {
      generatePathMap(items, pathMap);
    } else {
      let page = "";
      let routeType = "";
      ["platform", "framework", "integration"].forEach((type) => {
        const maybeFile = "./src/pages" + src;
        if (fs.existsSync(maybeFile)) {
          page = src;
          routeType = type;
        }
      });

      if (!page || !routeType) {
        continue;
      }
      filters.forEach((filter) => {
        const query = {};
        query[routeType] = filter;
        pathMap[route + "/q/" + routeType + "/" + filter] = {
          page,
          query,
        };
      });
    }
  }
  return pathMap;
}
