import * as t from "../types";
import * as fs from "fs-extra";
import * as path from "path";

export async function index(config: t.Config): Promise<void> {
  await fs.ensureDir(config.outDir);
  await fs.writeFile(
    path.join(config.outDir, "index.ts"),
    `
export * from "./get-page";
export * from "./stencil-renderer";
export * from "./routes";
export * from "./types";
export * from "./filters-by-route";
`,
    {
      encoding: "utf8",
    },
  );
}
