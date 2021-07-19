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
  },
) {
  for (const [_, value] of Object.entries(obj)) {
    const {items, filters, route} = value;

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
      const query = {};
      query[routeType] = filter;
      pathMap[route + "/q/" + routeType + "/" + filter] = {
        page: `${route}/q/${routeType}/[${filter}]`,
        query,
      };
    });
  }
  return pathMap;
}
