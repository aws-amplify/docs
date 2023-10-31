/**
 * Plugin options for `recmaMdxFrontmatter`
 */
type RecmaMdxFrontmatterOptions = {
  /**
   * Name of the node to look for (e.g. the one created by remark-frontmatter)
   */
  name: string = 'frontmatter'
  /**
   * Next.js dynamic routes to configure. This is used to generate getStaticPaths where necessary
   */
  dynamicRoutes: Record<string, unknown[]>
}
