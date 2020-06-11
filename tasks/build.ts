import * as path from "path";
import * as fs from "fs-extra";
import * as c from "capi/src";
import {execSync} from "child_process";
import {filterOptionsByName} from "../client/src/utils/filter-data";

const ENCODING_PROP = {encoding: "utf8"};
const cwd = path.resolve(__dirname, "..");
const clientDir = path.resolve(cwd, "client");
const BUILD_JS_GLOB_RELATIVE_TO_CWD = "client/www/build/**/*";

// ensure that `aws-exports.ts` is present, as to avoid Rollup error in GitHub CI
const awsExportsPathWithoutExtension = path.join(clientDir, "src/aws-exports");
const awsExportsJSPath = [awsExportsPathWithoutExtension, ".js"].join("");
const awsExportsTSPath = [awsExportsPathWithoutExtension, ".ts"].join("");
try {
  const awsExportsJSContents = fs.readFileSync(awsExportsJSPath, {
    encoding: "utf8",
  });
  fs.writeFileSync(awsExportsTSPath, awsExportsJSContents, ENCODING_PROP);
} catch (e) {
  fs.writeFileSync(awsExportsTSPath, "export default {};", ENCODING_PROP);
}

const StencilBuildProcess = (flags: string[]) =>
  execSync(`stencil build ${flags.join(" ")}`, {
    stdio: "inherit",
    cwd: clientDir,
  });

const DEV_FLAGS = ["--dev", "--watch", "--serve"];
const PROD_FLAGS = ["--prod", "--prerender", "--debug"];

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
