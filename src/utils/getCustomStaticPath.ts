/**
 * Helper function to return list of paths to be statically generated.
 * Used inside "getStaticPaths"
 */
export const getCustomStaticPath = (platforms: string[]) => {
  return {
    paths: platforms.map((platform) => ({ params: { platform } })),
    fallback: false
  };
};

export const getCustomStaticPathWithSlugs = (
  slugs: string[],
  platforms: string[]
) => {
  return {
    paths: platforms.map((platform) => ({ params: { platform, slug: slugs } })),
    fallback: false
  };
};
