import * as t from "../types";
import * as fs from "fs-extra";
import * as path from "path";

export async function pages(ctx: t.Ctx): Promise<void> {
  for (const [srcPath, page] of ctx.pageBySrcPath.entries()) {
    const pathDeduction = ctx.pathDeductionBySrcPath.get(srcPath);
    if (pathDeduction && pathDeduction.destinationPath) {
      await fs.ensureDir(path.dirname(pathDeduction.destinationPath));
      await fs.writeFile(pathDeduction.destinationPath, JSON.stringify(page), {
        encoding: "utf8",
      });
    }
  }
}
