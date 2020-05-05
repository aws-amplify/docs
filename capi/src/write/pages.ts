import * as t from "../types";
import * as fs from "fs-extra";
import * as path from "path";

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
      console.log(pathDeduction.route, filters);
      await fs.ensureDir(path.dirname(pathDeduction.destinationPath));
      await fs.writeFile(pathDeduction.destinationPath, JSON.stringify(page), {
        encoding: "utf8",
      });
    }
  }
}
