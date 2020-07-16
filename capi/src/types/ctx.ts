import {PathDeduction, ResolvePathDeduction} from "./path-deduction";
import {Page} from "./page";
import {HyperscriptNode} from "./hyperscript-node";
import {Config} from "./config";
import {WrittenMenu} from "./menu";

export type PathDeductionBySrcPath = Map<string, PathDeduction>;
export type PageBySrcPath = Map<string, Page>;
export type FilteredPagePathByRoute = Map<string, string>;
export type FragmentBySrcPath = Map<string, HyperscriptNode[]>;
export type SrcPathByRoute = Map<string, string>;
export type MenuBySrcPath = Map<string, WrittenMenu>;

export interface Ctx {
  config: Config;
  srcPaths: string[];
  resolvePathDeduction: ResolvePathDeduction;
  pathDeductionBySrcPath: PathDeductionBySrcPath;
  pageBySrcPath: PageBySrcPath;
  filteredPagePathByRoute: FilteredPagePathByRoute;
  fragmentBySrcPath: FragmentBySrcPath;
  srcPathByRoute: SrcPathByRoute;
  menuBySrcPath: MenuBySrcPath;
  pageSrcPaths: string[];
  contentDirDepth: number;
  productDirs: string[];
  rootPageSrcPath: string;
}
