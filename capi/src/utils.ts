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
