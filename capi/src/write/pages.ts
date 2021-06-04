import * as t from "../types";
import * as fs from "fs-extra";
import * as path from "path";
import clone from "clone-deep";
import traverse from "traverse";
import {hashPath} from "../utils";

// gets rid of any filterable content that IS NOT of the provided filter key/value combo
// returns the filtered hyperscript
function trimFiltered(
  body: t.HyperscriptNode[],
  {
    filterKey,
    filterValue,
  }: {
    filterKey: string;
    filterValue: string;
  },
): void {
  traverse(body).forEach(function(node) {
    if (
      Array.isArray(node) &&
      typeof node[0] === "string" &&
      node[0] === "docs-filter-target" &&
      node[1]?.filters
    ) {
      const currentFilterValue = node[1].filters[filterKey];
      if (!currentFilterValue || currentFilterValue !== filterValue) {
        this.delete();
      } else {
        const [, , ...children] = node;
        if (node.length > 0) {
          this.update(["div", null, ...children]);
        }
      }
    }
  });
}

export async function pages(ctx: t.Ctx): Promise<void> {
  for (const [srcPath, page] of ctx.pageBySrcPath.entries()) {
    const pathDeduction = ctx.pathDeductionBySrcPath.get(srcPath);
    if (pathDeduction && pathDeduction.destinationPath) {
      // gather all of the available filters for the page (if they exist)
      const filters =
        page.filters ||
        (page.filterKey
          ? {
              [page.filterKey]: ctx.config.filters?.[page.filterKey],
            }
          : undefined);

      // get the root outDir of the page
      const outDir = path.dirname(pathDeduction.destinationPath);

      if (filters) {
        const filterEntries = Object.entries(filters);
        const [filterEntry] = filterEntries;
        const [filterKey, filterValues] = filterEntry;
        await Promise.all(
          filterValues.map(
            async (filterValue): Promise<void> => {
              const virtualQueryString = ["q", filterKey, filterValue].join(
                path.sep,
              );
              // get the filtered route
              const filteredRoute = [page.route, virtualQueryString].join(
                path.sep,
              );
              const filteredOutDir = [outDir, virtualQueryString].join(
                path.sep,
              );
              // avoid node fs error
              await fs.ensureDir(filteredOutDir);
              // get the path on disk to the filtered page asset
              const filteredOutAsset = `${[
                filteredOutDir,
                pathDeduction.fileName,
              ].join(path.sep)}.json`;
              if (ctx.config.cwd && pathDeduction.destinationPath) {
                // get the URI to request
                const withoutFilterAssetURI = path.relative(
                  ctx.config.srcDir,
                  pathDeduction.destinationPath,
                );
                const withoutFilterAssetURIPieces = withoutFilterAssetURI.split(
                  path.sep,
                );
                withoutFilterAssetURIPieces.pop();
                const filteredAssetURI = `${[
                  ...withoutFilterAssetURIPieces,
                  virtualQueryString,
                  pathDeduction.fileName,
                ].join(path.sep)}.json`;
                // save in ctx so that we can use it in our `get-page` target
                ctx.filteredPagePathByRoute.set(
                  filteredRoute,
                  filteredAssetURI,
                );
              }

              // create and write the page-specific asset
              const bodyClone = clone(page.body);
              trimFiltered(bodyClone, {filterKey, filterValue});
              await fs.writeFile(
                hashPath(filteredOutAsset),
                JSON.stringify({...page, body: bodyClone}),
                {
                  encoding: "utf8",
                },
              );
            },
          ),
        );

        // write the filter selection at filterable page root
        const chooseProps = {
          page: {
            filterKey: page.filterKey,
            route: page.route,
            versions: page.versions,
          },
        };

        page.menu = undefined;
        page.next = undefined;
        page.previous = undefined;
        page.body = [
          [
            page.filterKey === "integration"
              ? "docs-choose-integration-anchor"
              : "docs-choose-anchor",
            chooseProps,
          ],
        ];
      }

      await fs.ensureDir(outDir);
      await fs.writeFile(
        hashPath(pathDeduction.destinationPath),
        JSON.stringify(page),
        {
          encoding: "utf8",
        },
      );
    }
  }
}
