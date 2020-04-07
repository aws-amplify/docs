import * as t from "../types";
import * as path from "path";
import * as fs from "fs-extra";

export async function routes(config: t.Config, ctx: t.Ctx): Promise<void> {
  let src = "export const routes = [\n";
  for (const [, page] of ctx.pageBySrcPath.entries()) {
    src += `  "${page.route}",\n`;
    if (page.versions) {
      Object.entries(page.versions).forEach(
        ([, version]) => (src += `  "${version}",\n`),
      );
    }
  }
  src = src += "];";
  await fs.ensureDir(config.outDir);
  await fs.writeFile(path.join(config.outDir, "routes.ts"), src, {
    encoding: "utf8",
  });
}
