import {PageLink} from "./page";

export interface WrittenMenu {
  title?: string;
  items: string[];
}

export interface MenuGroup {
  title: string;
  items: PageLink[];
}

export type Menu = MenuGroup[];
