import { Platform } from '@/data/platforms';

export type PageNode = {
  /**
   * Title of the page
   */
  title: string;

  /**
   * Description of the page
   */
  description: string;

  /**
   * Denotes that node is an external link (used for the navigation menu)
   */
  isExternal: boolean;

  /**
   * The platforms that the pages apply to
   */
  platforms: Platform[];

  /**
   * The page's file path or external URL
   */
  route: string;

  /**
   * The children pages
   */
  children: PageNode[] | undefined;
};
