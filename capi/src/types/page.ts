import {HyperscriptNode} from "./hyperscript-node";
import {Menu} from "./menu";

export type Filters = Record<string, string[]>;

export interface PageLink {
  route: string;
  title: string;
  filters?: Filters;
}

export type Direction = "next" | "previous";

export interface Page extends PageLink {
  sectionTitle?: string;
  productRootLink?: PageLink;
  relativeToContentDir: string;
  versions?: Record<string, string>;
  route: string;
  description: string;
  body: HyperscriptNode[];
  menu?: Menu;
  filters?: Filters;
  disableTOC?: boolean;
  noTemplate?: boolean;
  filterKey?: string;
  next?: Record<string, PageLink> | PageLink;
  previous?: Record<string, PageLink> | PageLink;
}
