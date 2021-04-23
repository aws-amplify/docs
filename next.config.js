// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require("@next/mdx")();
module.exports = withMDX({pageExtensions: ["js", "jsx", "mdx"]});
