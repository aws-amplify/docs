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
                if (filterKey) {
                  if (page.route.includes("/sdk")) {
                    return JSON.stringify({
                      platform: ["ios", "android"],
                    });
                  } else {
                    return JSON.stringify({
                      [filterKey]: page.filters?.[filterKey],
                    });
                  }
                }
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
