import { stream } from "fast-glob";
import {
  copyFile,
  ensureDirSync,
  ensureFile,
  readFile,
  readFileSync,
  writeFile,
} from "fs-extra";
import { safeLoad } from "js-yaml";
import { Liquid } from "liquidjs";
import { basename, dirname, extname, join, relative } from "path";
import * as rimraf from "rimraf";

const cwd = join(__dirname, "..");

const generatedDir = join(cwd, "v2/generated");
ensureDirSync(generatedDir);
rimraf.sync(generatedDir);

const gloptions = { absolute: true, cwd };

const fragmentsPattern = join(cwd, "theme/_includes/*");
const fragmentPathStream = stream(fragmentsPattern, gloptions);

const fragmentPathDestByFileName = new Map<string, string>();

const contentPatterns = [
  "android",
  "cli",
  "cli-toolchain",
  "images",
  "ios",
  "js",
].map(dirName => join(cwd, dirName, "**/*"));

const pending = new Array<Promise<void>>();

const getDestPath = (srcPath: string, extensionReplacement?: string) => {
  const dest = join(cwd, "v2/generated", relative(cwd, srcPath));
  if (extensionReplacement) {
    const split = dest.split(".");
    split.pop();
    return [split.join("."), extensionReplacement].join("");
  }
  return dest;
};

const liquid = new Liquid();
const configPath = join(cwd, "_config.yml");
const configContents = readFileSync(configPath).toString();
const config = safeLoad(configContents);
const environment = { jekyll: { environment: "development" }, site: config };
const injectConfigVars = (contents: string) =>
  liquid.parseAndRender(contents, environment);

(async () => {
  await (async () => {
    for await (const pathChunk of fragmentPathStream) {
      const path = pathChunk.toString();
      const fileName = basename(path);
      const dest = getDestPath(path, ".md");
      fragmentPathDestByFileName.set(fileName, dest);
      pending.push(
        (async () => {
          await ensureFile(dest);
          await copyFile(path, dest);
        })(),
      );
    }
  })();

  const contentPathStream = stream(contentPatterns, gloptions);
  await (async () => {
    for await (const pathChunk of contentPathStream) {
      const path = pathChunk.toString();
      const extension = extname(path);
      const dest = getDestPath(path);

      switch (extension) {
        case ".md": {
          pending.push(
            (async () => {
              let contents = (await readFile(path)).toString();

              contents = contents.replace(
                /{%+ include_relative .*}/g,
                `<connection to="common/scene-size-note.md" />`,
              );

              const matches = contents.match(/{%+ include .*}/g);
              if (matches)
                for (const match of matches) {
                  const fileName = match.split(" ")[2];
                  const fragmentPath = relative(
                    dirname(dest),
                    fragmentPathDestByFileName.get(fileName),
                  );
                  contents = contents.replace(
                    match,
                    `<connection to="${fragmentPath}" />`,
                  );
                }
              contents = await injectConfigVars(contents);
              pending.push(
                (async () => {
                  await ensureFile(dest);
                  await writeFile(dest, contents, { encoding: "utf8" });
                })(),
              );
            })(),
          );
          break;
        }

        default: {
          pending.push(
            (async () => {
              await ensureFile(dest);
              await copyFile(path, dest);
            })(),
          );
          break;
        }
      }
    }
  })();
})();
