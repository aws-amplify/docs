import * as c from "capi/src";
import * as path from "path";
import {spawn} from "child_process";
import {filterOptionsByName} from "../client/src/utils/filter-data";
import * as fs from "fs-extra";

const clientDir = path.join(__dirname, "../client");

// ensure that `aws-exports.ts` is present, as to avoid Rollup error in GitHub CI
const awsExportsPathWithoutExtension = path.join(clientDir, "src/aws-exports");
const awsExportsJSPath = [awsExportsPathWithoutExtension, ".js"].join("");
const awsExportsTSPath = [awsExportsPathWithoutExtension, ".ts"].join("");
try {
  const awsExportsJSContents = fs.readFileSync(awsExportsJSPath, {
    encoding: "utf8",
  });
  fs.writeFileSync(awsExportsTSPath, awsExportsJSContents, {encoding: "utf8"});
} catch (e) {
  fs.writeFileSync(awsExportsTSPath, "export default {};", {encoding: "utf8"});
}

const StencilBuildProcess = (flags: string[]) =>
  spawn(`stencil`, ["build", ...flags], {
    stdio: "inherit",
    cwd: clientDir,
  });

const DEV_FLAGS = ["--dev", "--watch", "--serve", "--max-workers=0"];
const PROD_FLAGS = ["--prod", "--prerender", "--debug", "--max-workers=0"];

const onWatching = () => {
  StencilBuildProcess(DEV_FLAGS);
};

const onTargetsWritten = () => {
  StencilBuildProcess(PROD_FLAGS);
};

const watch = !!(process.argv[3] === "--watch");
const skipClientBuild = !!(process.argv[3] === "--skip-client-build");
const hooks = skipClientBuild ? {} : watch ? {onWatching} : {onTargetsWritten};

c.API({
  cwd: path.join(__dirname, ".."),
  contentDir: "docs",
  filters: filterOptionsByName,
  hooks,
  outDir: "client/src/api",
  publicDir: "client/src/assets",
  watch,
  srcDir: "client/src",
});
