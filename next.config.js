const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,

  options: {
    remarkPlugins: [require("@silvenon/remark-smartypants")],
    rehypePlugins: [],
  },
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
});
