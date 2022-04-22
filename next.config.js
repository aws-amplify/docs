const withTM = require('next-transpile-modules')([
  '@algolia/autocomplete-shared'
]); // pass the modules you would like to see transpiled

const mdxRenderer = `
  import { mdx } from "@mdx-js/react";

`;

// eslint-disable-next-line @typescript-eslint/no-var-requires
const directory = require('./src/directory/directory.js');

module.exports = async (phase, { defaultConfig }) => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const headingLinkPlugin = await require('./src/plugins/headings.tsx');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const pagePlugin = await require('./src/plugins/page.tsx');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const internalLinkPlugin = await require('./src/plugins/internal-link.tsx');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const codeBlockPlugin = await require('./src/plugins/code-block.tsx');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const importPlugin = await require('./src/plugins/import.tsx');

  const withMDX = require('@next/mdx')({
    extension: /\.mdx$/,
    options: {
      remarkPlugins: [
        importPlugin,
        headingLinkPlugin,
        pagePlugin,
        internalLinkPlugin
      ],
      rehypePlugins: [codeBlockPlugin],
      renderer: mdxRenderer
    }
  });

  const nextConfig = withTM(
    withMDX({
      pageExtensions: ['js', 'jsx', 'mdx', 'tsx', 'ts'],
      typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true
      },
      future: {
        webpack5: true
      },
      exportPathMap,
      trailingSlash: true,
      async headers() {
        return [
          {
            // Apply these headers to all routes in your application.
            source: '/(.*)',
            headers: [
              // IMPORTANT:
              // These are ONLY used for the Dev server and MUST
              // be kept in sync with customHttp.yml
              {
                key: 'Strict-Transport-Security',
                value: 'max-age=63072000; includeSubDomains',
              },
              {
                key: 'X-Frame-Options',
                value: 'SAMEORIGIN',
              },
              {
                key: 'X-Content-Type-Options',
                value: 'nosniff',
              }
            ]
          }
        ]
      }
    })
  );

  return nextConfig;
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const generatePathMap = require('./generatePathMap.cjs');
function exportPathMap(defaultPathMap, props) {
  return generatePathMap(directory);
}
