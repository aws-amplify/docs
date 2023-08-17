import { createRequire } from 'module';
import dotenv from 'dotenv';
import _withMDX from '@next/mdx';
import { directory } from './src/directory/directory.mjs';
const require = createRequire(import.meta.url);
import rehypeImgSize from 'rehype-img-size';

dotenv.config({ path: './.env.custom' });

const mdxRenderer = `
  import { mdx } from "@mdx-js/react";

`;

export default async (phase, { defaultConfig }) => {
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

  const withMDX = _withMDX({
    extension: /\.mdx$/,
    options: {
      remarkPlugins: [
        frontmatterPlugin,
        importPlugin,
        headingLinkPlugin,
        pagePlugin,
        internalLinkPlugin
      ],
      rehypePlugins: [codeBlockPlugin, [rehypeImgSize, { dir: 'public' }]],
      renderer: mdxRenderer
    }
  });

  const nextConfig = withMDX({
    env: {
      BUILD_ENV: process.env.BUILD_ENV,
      nextImageExportOptimizer_imageFolderPath: 'public',
      nextImageExportOptimizer_exportFolderPath: 'out',
      nextImageExportOptimizer_quality: 75,
      nextImageExportOptimizer_storePicturesInWEBP: true,
      nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',

      // If you do not want to use blurry placeholder images, then you can set
      // nextImageExportOptimizer_generateAndUseBlurImages to false and pass
      // `placeholder="empty"` to all <ExportedImage> components.
      nextImageExportOptimizer_generateAndUseBlurImages: true
    },
    images: {
      loader: 'custom',
      imageSizes: [],
      deviceSizes: [450, 1920]
    },
    pageExtensions: ['js', 'jsx', 'mdx', 'tsx', 'ts'],
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true
    },
    exportPathMap,
    trailingSlash: true,
    transpilePackages: [
      '@algolia/autocomplete-shared',
      '@cloudscape-design/components',
      '@cloudscape-design/component-toolkit',
      'next-image-export-optimizer'
    ],
    // eslint-disable-next-line @typescript-eslint/require-await
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
  });

  return nextConfig;
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const generatePathMap = require('./generatePathMap.cjs');
function exportPathMap(defaultPathMap, props) {
  return generatePathMap(directory);
}
