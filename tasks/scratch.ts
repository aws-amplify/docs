// @ts-nocheck

// scratch file for quickly testing the generation of generatePathMap

import directory from "../src/directory/directory";
import fs from "fs";

const pathMap = generatePathMap(directory);

console.log(pathMap);

function generatePathMap(
  obj,
  pathMap = {
    "/": {
      page: "index.tsx",
    },
  },
) {
  for (const [_, value] of Object.entries(obj)) {
    const {items, filters, route} = value;

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
          page,
        };
      }
    }

    if (items) {
      generatePathMap(items, pathMap);
    } else {
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
