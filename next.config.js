const withTM = require('next-transpile-modules')([
  '@algolia/autocomplete-shared'
]); // pass the modules you would like to see transpiled

const theme = require('shiki/themes/nord.json');
const { remarkCodeHike } = require('@code-hike/mdx');

// eslint-disable-next-line @typescript-eslint/no-var-requires
const directory = require('./src/directory/directory.js');

require('dotenv').config({ path: './.env.custom' });

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
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const frontmatterPlugin = await require('./src/plugins/frontmatter.tsx');
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const codeHikeAddHydrationPlugin = await require('./src/plugins/code-hike-add-hydration.tsx');

  const withMDX = require('@next/mdx')({
    extension: /\.mdx$/,
    loader: '@mdx-js/loader',
    jsx: true,
    options: {
      providerImportSource: '@mdx-js/react',
      remarkPlugins: [
        [remarkCodeHike, { theme }],
        // frontmatterPlugin,
        importPlugin,
        codeHikeAddHydrationPlugin,
        headingLinkPlugin,
        pagePlugin,
        internalLinkPlugin
      ]
      // rehypePlugins: [codeBlockPlugin]
    }
  });

  const nextConfig = withTM(
    withMDX({
      env: {
        API_ENV: process.env.API_ENV
      },
      experimental: { esmExternals: true },
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
                value: 'max-age=63072000; includeSubDomains'
              },
              {
                key: 'X-Frame-Options',
                value: 'SAMEORIGIN'
              },
              {
                key: 'X-Content-Type-Options',
                value: 'nosniff'
              }
            ]
          }
        ];
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
