const mdxRenderer = `
  import { mdx } from "@mdx-js/react";

  export async function exportPathMap (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/getting-started': { page: '/getting-started' },
      '/lib/auth/getting-started/q/platform/js': { page: '/lib/auth/getting-started/q/platform/[platform]', query: {platform: 'js'} },
      '/lib/auth/getting-started/q/platform/ios': { page: '/lib/auth/getting-started/q/platform/[platform]', query: {platform: 'ios'} },
      '/ui/auth/authenticator/q/framework/react': { page: '/ui/auth/authenticator/q/framework/[framework]', query: {framework: 'react'} },
      '/ui/auth/authenticator/q/framework/react-native': { page: '/ui/auth/authenticator/q/framework/[framework]', query: {framework: 'react-native'} },
    }
  }

    /*
  export async function getStaticPaths ({params}) {
    return {
      paths: [],
      fallback: false,
    };
    return {
      paths: [
        {params: {platform: "js"}},
        {params: {platform: "ios"}},
        {params: {framework: "react"}},
        {params: {framework: "react-native"}},
        {params: {framework: "angular"}},
      ],
      fallback: false,
    }
  }
    */
`;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const headingLinkPlugin = require("./src/plugins/headings.tsx");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const layoutPlugin = require("./src/plugins/layout.tsx");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const importPlugin = require("./src/plugins/import.tsx");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const codeBlockPlugin = require("./src/plugins/code-block.tsx");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const withMDX = require("@next/mdx")({
  options: {
    remarkPlugins: [importPlugin, headingLinkPlugin, layoutPlugin],
    rehypePlugins: [codeBlockPlugin],
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
