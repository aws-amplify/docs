const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,

  options: {
    remarkPlugins: [require("@silvenon/remark-smartypants")],
    rehypePlugins: [[require("@mapbox/rehype-prism"), {ignoreMissing: true}]],
  },
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
});
