import * as t from "../types";
import * as path from "path";
import * as fs from "fs-extra";

export async function routes(config: t.Config, ctx: t.Ctx): Promise<void> {
  const routes = new Map<string, true>();

  for (const [, page] of ctx.pageBySrcPath.entries()) {
    routes.set(page.route, true);
    if (page.versions) {
      Object.entries(page.versions).forEach(([, version]) =>
        routes.set(version, true),
      );
    }
  }

  const src = `export const routes = [\n${[...routes.keys()]
    .map((route) => `  "${route}",`)
    .join("\n")}\n];\n`;

  await fs.ensureDir(config.outDir);
  await fs.writeFile(path.join(config.outDir, "routes.ts"), src, {
    encoding: "utf8",
  });
}
