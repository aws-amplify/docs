import dotenv from 'dotenv';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';
import nextMDX from '@next/mdx';
import recmaMdxFrontmatter from './src/plugins/recma-mdx-frontmatter.mjs';
import directory from './src/directory/directory.js';
import generatePathMap from './generatePathMap.cjs';

dotenv.config({ path: './.env.custom' });

export default async (phase, { defaultConfig }) => {
  const withMDX = nextMDX({
    extension: /\.mdx$/,
    jsx: true,
    options: {
      remarkPlugins: [
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
        remarkGfm
        // importPlugin,
        // headingLinkPlugin,
        // pagePlugin,
        // internalLinkPlugin
      ],
      // rehypePlugins: [codeBlockPlugin],
      recmaPlugins: [[recmaMdxFrontmatter, { name: 'frontmatter' }]],
      providerImportSource: '@mdx-js/react'
    }
  });

  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig = {
    eslint: {
      ignoreDuringBuilds: true
    },
    env: {
      API_ENV: process.env.API_ENV
    },
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
  };

  return withMDX(nextConfig);
};

function exportPathMap(defaultPathMap, props) {
  return generatePathMap(directory);
}
