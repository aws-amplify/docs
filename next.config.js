const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [
      require("@silvenon/remark-smartypants"),
    ],
    rehypePlugins: [],
  },
})

module.exports = withMDX()
