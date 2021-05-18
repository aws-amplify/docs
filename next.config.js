const mdxRenderer = `
  import { mdx } from "@mdx-js/react";

  export async function getStaticProps ({params}) {
    if(params.platform == 'js') {
      return {
        props: {},
      };
    }
    else {
      return {
        props: {},
        notFound: true,
      };
    }
  }

  export async function getStaticPaths ({params}) {
    return {
      paths: [],
      fallback: true,
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const headingLinkPlugin = require("./src/plugins/headings.tsx");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const layoutPlugin = require("./src/plugins/layout.tsx");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [headingLinkPlugin, layoutPlugin],
    renderer: mdxRenderer,
  },
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx", "tsx"],
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  future: {
    webpack5: true,
  },
});
