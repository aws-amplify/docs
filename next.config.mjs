import { createRequire } from 'module';
import dotenv from 'dotenv';
import createMDX from '@next/mdx';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';

const require = createRequire(import.meta.url);
import rehypeImgSize from 'rehype-img-size';
import remarkGfm from 'remark-gfm';
dotenv.config({ path: './.env.custom' });

const nextJSConfig = () => {
  const withMDX = createMDX({
    extension: /\.mdx$/,
    options: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [[rehypeImgSize, { dir: 'public' }], rehypeMdxCodeProps]
    }
  });

  const shouldAnalyzeBundles = process.env.ANALYZE === 'true';

  let nextConfig = withMDX({
    output: 'export',
    distDir: 'client/www/next-build',
    env: {
      BUILD_ENV: process.env.BUILD_ENV,
      nextImageExportOptimizer_imageFolderPath: 'public',
      nextImageExportOptimizer_exportFolderPath: 'out',
      nextImageExportOptimizer_quality: '75',
      nextImageExportOptimizer_storePicturesInWEBP: 'true',
      nextImageExportOptimizer_exportFolderName: 'nextImageExportOptimizer',

      // If you do not want to use blurry placeholder images, then you can set
      // nextImageExportOptimizer_generateAndUseBlurImages to false and pass
      // `placeholder="empty"` to all <ExportedImage> components.
      nextImageExportOptimizer_generateAndUseBlurImages: 'true'
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
    ]
  });

  if (shouldAnalyzeBundles) {
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

export default nextJSConfig;
