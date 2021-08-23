const fs = require("fs");

const mdxRenderer = `
  import { mdx } from "@mdx-js/react";

`;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const directory = require("./src/directory/directory.js");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const headingLinkPlugin = require("./src/plugins/headings.tsx");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const pagePlugin = require("./src/plugins/page.tsx");
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
      pagePlugin,
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
    "/start": {
      page: "/start",
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
    "/lib/q/platform/flutter": {
      page: "/lib/q/platform/[platform]",
    },
    "/lib/q/platform/android": {
      page: "/lib/q/platform/[platform]",
    },
    "/lib/q/platform/ios": {
      page: "/lib/q/platform/[platform]",
    },
    "/lib/q/platform/js": {
      page: "/lib/q/platform/[platform]",
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
    "/cli": {
      page: "/cli",
    },
    "/cli/function": {
      page: "/cli/function",
    },
  },
) {
  for (const [_, value] of Object.entries(obj)) {
    const {items, filters, route, productRoot} = value;

    if (productRoot) {
      const {route} = productRoot;

      let filterKind = "";
      if (route.startsWith("/cli") || route.startsWith("/console")) {
        filterKind = "";
      } else if (route.startsWith("/lib")) {
        filterKind = "platform";
      } else if (route.startsWith("/sdk")) {
        filterKind = "platform";
      } else if (route.startsWith("/ui")) {
        filterKind = "framework";
      } else if (route.startsWith("/guides")) {
        filterKind = "platform";
      } else if (route.startsWith("/start")) {
        filterKind = "integration";
      }

      if (filterKind !== "") {
        const aOrAn = "aeiou".includes(filterKind[0]) ? "an" : "a";
        pathMap[route] = {
          page: "/ChooseFilterPage",
          query: {
            href: route,
            filterKind: filterKind,
            message: `Choose ${aOrAn} ${filterKind}:`,
          },
        };
      }
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

    // generate for _all_ filters -- unsupported filters will just generate ChooseFilterPages, which is what we want
    // ideally misspellings would also map to a ChooseFilterPage, but this doesn't work with SSG
    let allFilters = filters;
    if (routeType !== "") {
      allFilters = [
        "js",
        "android",
        "ios",
        "flutter",
        "react",
        "react-native",
        "angular",
        "vue",
        "ionic",
        "next",
      ];
    }
    allFilters.forEach((filter) => {
      pathMap[route + "/q/" + routeType + "/" + filter] = {
        page: `${route}/q/${routeType}/[${routeType}]`,
      };
    });
    const aOrAn = "aeiou".includes(routeType[0]) ? "an" : "a";
    pathMap[route] = {
      page: "/ChooseFilterPage",
      query: {
        href: route,
        filterKind: routeType,
        filters: filters,
        message: `Choose ${aOrAn} ${routeType}:`,
      },
    };
  }
  return pathMap;
}
