import * as path from "path";
import * as t from "./types";
import clone from "clone-deep";

/**
 * given a list of paths `paths`, this method returns the subset containing
 * only paths of a certain depth (measured as the number of pieces when split
 * by `require('path').sep`)
 */
export const getPathsOfDepth = (paths: string[], depth: number): string[] =>
  paths.filter((pageSrcPath) => pageSrcPath.split(path.sep).length === depth);

/**
 * extract the `PageLink` (a subset) from a `Page`
 */
export const createPageLink = (page: t.Page): t.PageLink => ({
  title: page.title,
  route: page.route,
  ...(page.filters ? {filters: clone(page.filters)} : {}),
});

/**
 * given a file or asset path, this method "hashes" the filename using a simple
 * base64 encode so that adblockers don't mistakenly block the page.
 */
export const hashPath = (path: string): string => {
  const paths = path.split("/");
  const fileNameWithExtension = paths.pop() as string;
  const [fileName, extension] = fileNameWithExtension.split(".");
  const hashedFileName =
    Buffer.from(fileName).toString("base64") + "." + extension;
  return [...paths, hashedFileName].join("/");
};
