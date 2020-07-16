import * as t from "./types";
import * as path from "path";

const isFragment = (srcPath: string): boolean =>
  srcPath.split(path.sep).includes("fragments");

/**
 * we can deduce a lot from the `srcPath`, without having to load
 * and traverse the file contents. This is useful, as we can quickly build
 * a dictionary from which any `srcPath` can be resolved to a resulting
 * page / fragment / image.
 */
export class PathDeduction implements t.PathDeduction {
  /**
   * for generating page child/sibling menus
   */
  grandParentDir: string;
  /**
   * if the `folderName` and `fileName` are the same, the given asset is a page
   */
  folderName: string;
  fileName: string;
  /**
   * md files resolve to pages/fragments in the generated API, whereas others
   * are simply copied to the public folder
   */
  extension: string;
  /**
   * the relative path between the `cwd`-relative `contentDir` and the `srcPath`,
   * excluding fileName and extension
   */
  route?: string;
  /**
   * this enables us to reliably reference an asset without bundler configuration
   */
  uri?: string;
  /**
   * where to write the asset within the resolved `publicDir`
   */
  destinationPath?: string;
  /**
   * for creating page-specific repo links
   */
  relativeToContentDir: string;
  /**
   * used by ancestree
   */
  isMenu: boolean;

  constructor(public srcPath: string, config: t.Config) {
    const {dir: parentDir, ext: extension, name: fileName} = path.parse(
      srcPath,
    );

    this.grandParentDir = path.dirname(parentDir);
    this.extension = extension;
    this.fileName = fileName;
    this.folderName = parentDir.split(path.sep).pop() as string;

    this.relativeToContentDir = path.relative(config.contentDir, srcPath);

    // default to false
    this.isMenu = false;

    if (extension === ".md") {
      if (isFragment(srcPath)) {
        // we don't need to do the below processing on fragments, only pages
        return;
      } else {
        // if we have a file such as `~/lib/lib.md`, we want the route to be `/lib`
        if (fileName === this.folderName) {
          this.route = ["/", path.relative(config.contentDir, parentDir)].join(
            "",
          );
        }
        // if we have a file such as `~/lib/auth/overview.md`, we want the route to be `/lib/auth/overview`
        else {
          this.route = [
            "/",
            path.relative(config.contentDir, parentDir),
            "/",
            fileName,
          ].join("");
        }
      }

      this.destinationPath = path.join(
        config.outDir,
        path.dirname(this.relativeToContentDir),
        [fileName, ".json"].join(""),
      );
    } else if (extension === ".json") {
      // override the default
      this.isMenu = true;
    } else {
      this.destinationPath = path.join(
        config.publicDir,
        this.relativeToContentDir,
      );
      this.uri = `/${this.relativeToContentDir}`;
    }
  }
}
