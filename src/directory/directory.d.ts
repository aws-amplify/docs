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

  /**
   * This flag indicates that the item is new and will display a "new" badge
   */
  isNew?: boolean;

  /**
   * The top-nav section this page belongs to
   */
  section?:
    | 'quickstart'
    | 'frontend'
    | 'backend'
    | 'ui'
    | 'hosting'
    | 'reference';

  /**
   * Related pages in other sections (for cross-linking)
   */
  relatedPages?: string[];

  /**
   * Gen version: 1, 2, or both
   */
  genVersion?: 'gen1' | 'gen2' | 'both';
};

/**
 * A single entry in redirects.json that maps an old URL path
 * to a new URL path for Amplify Hosting rewrite rules.
 */
export interface RedirectEntry {
  /** The address the user requested */
  source: string;
  /** The address that actually serves the content */
  target: string;
  /** HTTP status: permanent redirect, temporary redirect, or rewrite */
  status: '301' | '302' | '404-200';
  /** Audit trail: why this redirect exists */
  reason?: string;
}
