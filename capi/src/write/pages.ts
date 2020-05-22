import * as t from "../types";
import * as fs from "fs-extra";
import * as path from "path";
import clone from "clone-deep";
import traverse from "traverse";

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
      const filters =
        page.filters ||
        (page.filterKey
          ? {
              [page.filterKey]: ctx.config.filters?.[page.filterKey],
            }
          : undefined);

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
              const filteredRoute = [page.route, virtualQueryString].join(
                path.sep,
              );
              const filteredOutDir = [outDir, virtualQueryString].join(
                path.sep,
              );
              await fs.ensureDir(filteredOutDir);
              const filteredOutAsset = `${[
                filteredOutDir,
                pathDeduction.fileName,
              ].join(path.sep)}.json`;
              if (ctx.config.cwd && pathDeduction.destinationPath) {
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
                ctx.filteredPagePathByRoute.set(
                  filteredRoute,
                  filteredAssetURI,
                );
              }

              const bodyClone = clone(page.body);
              trimFiltered(bodyClone, {filterKey, filterValue});
              await fs.writeFile(
                filteredOutAsset,
                JSON.stringify({...page, body: bodyClone}),
                {
                  encoding: "utf8",
                },
              );
            },
          ),
        );

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
      await fs.writeFile(pathDeduction.destinationPath, JSON.stringify(page), {
        encoding: "utf8",
      });
    }
  }
}
