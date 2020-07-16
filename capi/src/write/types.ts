import * as t from "../types";
import * as path from "path";
import * as fs from "fs-extra";

export async function types(config: t.Config): Promise<void> {
  const capiDirPieces = require.resolve("capi").split(path.sep);
  capiDirPieces.pop();
  capiDirPieces.pop();
  const capiTypesDir = [...capiDirPieces, "src", "types"].join(path.sep);
  const outTypesDir = path.join(config.outDir, "types");
  await fs.ensureDir(outTypesDir);
  await Promise.all([
    fs.copyFile(
      path.join(capiTypesDir, "page.ts"),
      path.join(outTypesDir, "page.ts"),
    ),
    fs.copyFile(
      path.join(capiTypesDir, "menu.ts"),
      path.join(outTypesDir, "menu.ts"),
    ),
    fs.copyFile(
      path.join(capiTypesDir, "hyperscript-node.ts"),
      path.join(outTypesDir, "hyperscript-node.ts"),
    ),
    fs.writeFile(
      path.join(outTypesDir, "index.ts"),
      `
export * from "./hyperscript-node";
export * from "./page";
export * from "./menu";
`,
      {encoding: "utf8"},
    ),
  ]);
}
