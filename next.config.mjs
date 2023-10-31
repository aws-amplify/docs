import { createRequire } from 'module';
import createMDX from '@next/mdx';
import dotenv from 'dotenv';
import rehypeImgSize from 'rehype-img-size';
import remarkFrontmatter from 'remark-frontmatter';
import remarkMdxFrontmatter from 'remark-mdx-frontmatter';
import remarkGfm from 'remark-gfm';
import recmaMdxFrontmatter from './plugins/recma-mdx-frontmatter.mjs';

const require = createRequire(import.meta.url);
dotenv.config({ path: './.env.custom' });

export default async () => {
  const withMDX = createMDX({
    extension: /\.mdx$/,
    jsx: true,
    options: {
      providerImportSource: '@mdx-js/react',
      recmaPlugins: [
        [
          recmaMdxFrontmatter,
          {
            name: 'frontmatter',
            dynamicRoutes: {
              platform: ['javascript', 'android']
            }
          }
        ]
      ],
      rehypePlugins: [[rehypeImgSize, { dir: 'public' }]],
      remarkPlugins: [
        remarkFrontmatter,
        [remarkMdxFrontmatter, { name: 'frontmatter' }],
        remarkGfm
      ]
    }
  });

  const shouldAnalyzeBundles = process.env.ANALYZE === 'true';

  let nextConfig = withMDX({
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
    trailingSlash: true,
    transpilePackages: [
      '@algolia/autocomplete-shared',
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

  if (shouldAnalyzeBundles) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const withNextBundleAnalyzer = require('next-bundle-analyzer')({
      format: ['json'],
      reportDir: '../.github/analyze',
      json: {
        filter: {
          pages: true
        }
      }
    });
    nextConfig = withNextBundleAnalyzer(nextConfig);
  }

  return nextConfig;
};
