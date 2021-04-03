import * as t from "../types";
import * as path from "path";
import {Project, ScriptTarget} from "ts-morph";
import * as fs from "fs-extra";

const project = new Project({
  compilerOptions: {
    target: ScriptTarget.ES2018,
  },
});

// DELETE
function base64(path: string): string {
  const paths = path.split("/");
  let fileName = paths.pop();
  if (!fileName) {
    fileName = "";
  }
  let hashedFileName;
  if (typeof btoa === "undefined") {
    hashedFileName = Buffer.from(fileName).toString("base64");
  } else {
    hashedFileName = btoa(path);
  }
  return [...paths, hashedFileName].join("/");
}

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
          .writeLine("  function base64(path: string): string {")
          .writeLine(`    const paths = path.split("/");`)
          .writeLine("    let fileName = paths.pop();")
          .writeLine("    if (!fileName) {")
          .writeLine(`      fileName = "";`)
          .writeLine("    }")
          .writeLine("    let hashedFileName;")
          .writeLine(`    if (typeof btoa === "undefined") {`)
          .writeLine(
            `      hashedFileName = Buffer.from(fileName).toString("base64");`,
          )
          .writeLine("    } else {")
          .writeLine("      hashedFileName = btoa(path);")
          .writeLine("    }")
          .writeLine(`    return [...paths, hashedFileName].join("/");`)
          .writeLine("  }")
          .blankLine()
          .writeLine(`  const pending = (() => {`)
          .writeLine("    switch (route) {");

        for (const [, pathDeduction] of ctx.pathDeductionBySrcPath) {
          if (pathDeduction.route) {
            console.log("path: " + pathDeduction.route);
            console.log(
              base64(
                `/api/${path.relative(
                  config.outDir,
                  pathDeduction.destinationPath as string,
                )}`,
              ),
            );
            writer
              .writeLine(`      case "${pathDeduction.route}":`)
              .writeLine(
                `        return fetch(base64("/api/${path.relative(
                  config.outDir,
                  pathDeduction.destinationPath as string,
                )}"));`,
              );
          }
        }

        for (const [filteredRoute, assetURI] of ctx.filteredPagePathByRoute) {
          console.log("asset: " + assetURI);
          console.log(base64(`/${assetURI}`));
          writer
            .writeLine(`      case "${filteredRoute}":`)
            .writeLine(`        return fetch(base64("/${assetURI}"));`);
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
