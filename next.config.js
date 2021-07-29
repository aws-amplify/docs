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
  extension: /\.mdx$/,
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
  pageExtensions: ["js", "jsx", "mdx", "tsx", "ts"],
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
  trailingSlash: true,
});

async function exportPathMap(
  defaultPathMap,
  {dev, dir, outDir, distDir, buildId},
) {
  const pathMap = generatePathMap(directory);
  return pathMap;
}

function generatePathMap(
  obj,
  pathMap = {
    "/": {
      page: "/",
    },
    "/404": {
      page: "/404",
    },
    "/start/q/integration/js": {
      page: "/start/q/integration/[integration]",
    },
    "/start/q/integration/react": {
      page: "/start/q/integration/[integration]",
    },
    "/start/q/integration/angular": {
      page: "/start/q/integration/[integration]",
    },
    "/start/q/integration/vue": {
      page: "/start/q/integration/[integration]",
    },
    "/start/q/integration/next": {
      page: "/start/q/integration/[integration]",
    },
    "/start/q/integration/android": {
      page: "/start/q/integration/[integration]",
    },
    "/start/q/integration/react-native": {
      page: "/start/q/integration/[integration]",
    },
    "/start/q/integration/ionic": {
      page: "/start/q/integration/[integration]",
    },
    "/start/q/integration/ios": {
      page: "/start/q/integration/[integration]",
    },
    "/start/q/integration/flutter": {
      page: "/start/q/integration/[integration]",
    },
    "/ui/q/framework/react": {
      page: "/ui/q/framework/[framework]",
    },
    "/ui/q/framework/react-native": {
      page: "/ui/q/framework/[framework]",
    },
    "/ui/q/framework/angular": {
      page: "/ui/q/framework/[framework]",
    },
    "/ui/q/framework/vue": {
      page: "/ui/q/framework/[framework]",
    },
    "/ui/q/framework/ionic": {
      page: "/ui/q/framework/[framework]",
    },
    "/ui/q/framework/next": {
      page: "/ui/q/framework/[framework]",
    },
    "/ui-legacy/q/framework/react": {
      page: "/ui-legacy/q/framework/[framework]",
    },
    "/ui-legacy/q/framework/react-native": {
      page: "/ui-legacy/q/framework/[framework]",
    },
    "/ui-legacy/q/framework/angular": {
      page: "/ui-legacy/q/framework/[framework]",
    },
    "/ui-legacy/q/framework/vue": {
      page: "/ui-legacy/q/framework/[framework]",
    },
    "/ui-legacy/q/framework/ionic": {
      page: "/ui-legacy/q/framework/[framework]",
    },
    "/ui-legacy/q/framework/next": {
      page: "/ui-legacy/q/framework/[framework]",
    },
    "/sdk/q/platform/js": {
      page: "/sdk/q/platform/[platform]",
    },
    "/sdk/q/platform/android": {
      page: "/sdk/q/platform/[platform]",
    },
    "/sdk/q/platform/ios": {
      page: "/sdk/q/platform/[platform]",
    },
    "/sdk/q/platform/flutter": {
      page: "/sdk/q/platform/[platform]",
    },
    "/console": {
      page: "/console",
    },
  },
) {
  for (const [_, value] of Object.entries(obj)) {
    const {items, filters, route, productRoot} = value;

    if (productRoot) {
      const {route} = productRoot;
      let page = route;

      // // fix for cli
      // if (route === "/cli") {
      //   page = "/cli/cli";
      // }

      // // fix for console
      // if (route === "/console") {
      //   page = "/console/console";
      // }

      pathMap[route] = {
        page,
      };
    }

    if (items) {
      generatePathMap(items, pathMap);
    }

    if (!filters || !filters.length) {
      let page = "";
      const mdxSrc = `${route}.mdx`;
      const tsxSrc = `${route}.tsx`;

      const maybeMDXFile = "./src/pages" + mdxSrc;
      const maybeTSXFile = "./src/pages" + tsxSrc;

      if (fs.existsSync(maybeTSXFile)) {
        page = tsxSrc;
      } else if (fs.existsSync(maybeMDXFile)) {
        page = mdxSrc;
      }

      if (page.length) {
        pathMap[route] = {
          page: route,
        };
      }

      continue;
    }

    let page = "";
    let routeType = "";
    ["platform", "framework", "integration"].forEach((type) => {
      const src = `${route}/q/${type}/[${type}].mdx`;
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
      pathMap[route + "/q/" + routeType + "/" + filter] = {
        page: `${route}/q/${routeType}/[${routeType}]`,
      };
    });
  }
  return pathMap;
}
