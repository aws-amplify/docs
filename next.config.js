const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  async rewrites() {
    return [
      // we need to define a no-op rewrite to trigger checking
      // all pages/static files before we attempt proxying
      {
        source: "/:path*",
        destination: "/:path*"
      },
      {
        source: "/",
        destination: `https://docs.amplify.aws/`
      },
      {
        source: "/:path*",
        destination: `https://docs.amplify.aws/:path*`
      }
    ];
  }
});
