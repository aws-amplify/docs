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
  isExternal?: boolean;

  /**
   * The platforms that the pages apply to
   */
  platforms: Platform[];

  /**
   * The relative file path of the page
   */
  path?: string;

  /**
   * The page's route (used for page navigation in Next.js) or external URL
   */
  route: string;

  /**
   * The children pages
   */
  children?: PageNode[];

  /**
   * Root url for the home page
   */
  url?: string;

  /**
   * String representing when file was last edited
   */
  lastUpdated?: string;

  /**
   * Denotes whether the page should be included in the side nav.
   * Set as a page level static prop
   */
  hideFromNav?: boolean;

  /**
   * This flag indicates that the children for this node should be hidden in the base menu
   * This is being used for categories like Cli - Legacy and SDK
   */
  hideChildrenOnBase?: boolean;
};
