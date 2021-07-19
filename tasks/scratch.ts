// @ts-nocheck

// scratch file for quickly testing the generation of generatePathMap

import directory from "../src/directory/directory";
import fs from "fs";

const pathMap = generatePathMap(directory);

console.log(pathMap);

function generatePathMap(obj, pathMap = {}) {
  for (const [_, value] of Object.entries(obj)) {
    const {items, filters, route} = value;

    if (items) {
      generatePathMap(items, pathMap);
    } else {
      if (filters) {
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
        filters.forEach((filter) => {
          const query = {};
          query[routeType] = filter;
          console.log({
            page,
            query,
          });
          pathMap[route + "/q/" + routeType + "/" + filter] = {
            page,
            query,
          };
        });
      }
    }
  }
  return pathMap;
}
