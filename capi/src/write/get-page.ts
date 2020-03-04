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
            "export async function getPage(route: string): Promise<t.Page> {",
          )
          .writeLine(`  return (() => {`)
          .writeLine("    switch(route) {");

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
          .writeLine("    }")
          .writeLine(`  })().then((response) => response.json());`)
          .writeLine("}");
      },
      {overwrite: true},
    )
    .save();
}
