import * as t from "../types";
import * as path from "path";
import * as fs from "fs-extra";

export async function routes(config: t.Config, ctx: t.Ctx): Promise<void> {
  let src = "export const routes = [\n";
  for (const [srcPath, page] of ctx.pageBySrcPath) {
    src += `  "${page.route}",\n`;
  }
  src = src += "];";
  await fs.ensureDir(config.outDir);
  await fs.writeFile(path.join(config.outDir, "routes.ts"), src, {
    encoding: "utf8",
  });
}
