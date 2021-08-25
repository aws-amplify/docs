// @ts-nocheck

// scratch file for quickly testing the generation of generatePathMap

import directory from "../src/directory/directory";
import fs from "fs";

const pathMap = generatePathMap(directory);

console.log(pathMap);
fs.writeFile("./path-map.json", JSON.stringify(pathMap, null, 2), (err) => {
  if (err) console.error(err);
});

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
  },
) {
  for (const [_, value] of Object.entries(obj)) {
    const {items, filters, route, productRoot} = value;

    if (productRoot) {
      const {route} = productRoot;
      let page = route;
      if (route == "/cli") {
        page = "/cli/cli";
      }
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
