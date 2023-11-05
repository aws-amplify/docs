type DynamicRoutePart = string;
type DynamicRouteFrontmatterConfig = {
  /**
   * The frontmatter key to use with the route part
   * @default {DynamicRoutePart}
   * @example
   * // if route part = "platform"
   * // but the frontmatter key is pluralized "platforms"
   * key: "platforms"
   */
  key?: string;
  /**
   * Allowed values for frontmatter
   */
  values: unknown[];
};

/**
 * Plugin options for `recmaMdxFrontmatter`
 */
type RecmaMdxFrontmatterOptions = {
  /**
   * Name of the node to look for (e.g. the one created by remark-frontmatter)
   * @default "frontmatter"
   */
  name: string;
  /**
   * Next.js dynamic routes to configure. This is used to generate getStaticPaths where necessary
   */
  dynamicRoutes?: Record<DynamicRoutePart, DynamicRouteFrontmatterConfig>;
};
