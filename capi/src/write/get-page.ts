import * as t from "../types";
import * as path from "path";
import {Project, ScriptTarget} from "ts-morph";
import * as fs from "fs-extra";

const project = new Project({
  compilerOptions: {
    target: ScriptTarget.ES2018,
  },
});

export async function getPage(config: t.Config, ctx: t.Ctx): Promise<void> {
  await fs.ensureDir(config.outDir);
  return project
    .createSourceFile(
      path.join(config.outDir, "get-page.ts"),
      (writer) => {
        writer
          .writeLine(`import * as t from "./types";`)
          .blankLine()
          .writeLine(
            "export function getPage(route: string): Promise<t.Page> | undefined {",
          )
          .writeLine(`  const pending = (() => {`)
          .writeLine("    switch (route) {");

        for (const [srcPath, pathDeduction] of ctx.pathDeductionBySrcPath) {
          if (pathDeduction.route) {
            writer
              .writeLine(`      case "${pathDeduction.route}":`)
              .writeLine(
                `        return fetch("/api/${path.relative(
                  config.outDir,
                  pathDeduction.destinationPath as string,
                )}");`,
              );
          }
        }

        writer
          .writeLine("      default: {")
          .writeLine('        console.error(`No such page "${route}"`);')
          .writeLine("        return undefined;")
          .writeLine("      }");

        writer
          .writeLine("    }")
          .writeLine(`  })();`)
          .writeLine(`  return pending`)
          .writeLine(
            `    ? pending.then((response) => response.json()) as Promise<t.Page>`,
          )
          .writeLine(`    : undefined;`)
          .writeLine("}");
      },
      {overwrite: true},
    )
    .save();
}
