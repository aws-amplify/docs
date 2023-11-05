export type DynamicRoutePart = string;
export type DynamicRouteFrontmatterConfig = {
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
