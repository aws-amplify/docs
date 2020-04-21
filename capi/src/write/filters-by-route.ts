import * as t from "../types";
import * as path from "path";
import * as fs from "fs-extra";

export async function filtersByRoute(
  config: t.Config,
  ctx: t.Ctx,
): Promise<void> {
  let src = "export const filtersByRoute = new Map([\n";
  for (const [srcPath, pathDeduction] of ctx.pathDeductionBySrcPath) {
    if (pathDeduction.route) {
      const page = ctx.pageBySrcPath.get(srcPath);
      page &&
        (src += `  ["${pathDeduction.route}", ${
          page?.filterKey
            ? ((): string | undefined => {
                const filterKey = page?.filterKey as string | undefined;
                return filterKey
                  ? page.route.includes("/sdk")
                    ? JSON.stringify({
                        platform: ["ios", "android"],
                      })
                    : JSON.stringify({
                        [filterKey]: page.filters?.[filterKey],
                      })
                  : undefined;
              })()
            : undefined
        }],\n`);
    }
  }
  src = src += "]) as Map<string, Record<string, string[]> | undefined>;";
  await fs.ensureDir(config.outDir);
  await fs.writeFile(path.join(config.outDir, "filters-by-route.ts"), src, {
    encoding: "utf8",
  });
}
