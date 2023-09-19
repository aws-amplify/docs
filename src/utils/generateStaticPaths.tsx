export function generateStaticPaths(
  filterKey: string,
  supportedPlatforms: string[]
) {
  return {
    paths: supportedPlatforms.map((platform) => {
      return {
        params: {
          [filterKey]: platform
        }
      };
    }),
    fallback: false
  };
}
