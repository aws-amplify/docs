// @ts-nocheck

// scratch file for quickly testing the generation of generatePathMap

import directory from "../src/directory/directory";
import fs from "fs";

const pathMap = generatePathMap(directory);

// console.log(pathMap);

function generatePathMap(obj, pathMap = {}) {
  for (const [_, value] of Object.entries(obj)) {
    const {items, filters, route, title} = value;

    // temporary fix until we rebase
    if (title === "Null safety") continue;

    if (items) {
      generatePathMap(items, pathMap);
    } else {
      if (!filters.length) {
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
          page,
          query,
        };
      });
    }
  }
  return pathMap;
}
