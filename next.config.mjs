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

const shouldAnalyzeBundles = process.env.ANALYZE === 'true';

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
    exportPathMap,
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
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    async rewrites() {
      return [
        {
          source: '/:path',
          destination: '/404/index.html'
        }
      ];
    },
    // eslint-disable-next-line @typescript-eslint/require-await
    async redirects() {
      return [
        {
          source: '/lib/ssr/ssr/q/platform/js/',
          destination: '/lib/ssr/q/platform/js/',
          permanent: true
        },
        {
          source: '/cli/function/function/',
          destination: '/cli/function/',
          permanent: true
        },
        {
          source: '/lib/ssr/ssr/',
          destination: '/lib/ssr/',
          permanent: true
        },
        {
          source: '/cli/plugins/',
          destination: '/cli/plugins/plugins/',
          permanent: true
        },
        {
          source: '/cli/usage/tags/',
          destination: '/cli/project/tags/',
          permanent: true
        },
        {
          source: '/cli/usage/permissions-boundary/',
          destination: '/cli/project/permissions-boundary/',
          permanent: true
        },
        {
          source: '/cli/usage/command-hooks/',
          destination: '/cli/project/command-hooks/',
          permanent: true
        },
        {
          source: '/cli/usage/monorepo/',
          destination: '/cli/project/monorepo/',
          permanent: true
        },
        {
          // page has ben removed, has note, do we want this redirected elsewhere?
          source: '/cli/usage/iam/',
          destination: '/cli/reference/iam/',
          permanent: true
        },
        {
          source: '/cli/usage/iam-roles-mfa/',
          destination: '/cli/reference/iam-roles-mfa/',
          permanent: true
        },
        {
          source: '/cli/usage/customcf/',
          destination: '/cli/custom/cloudformation/',
          permanent: true
        },
        {
          source: '/cli/usage/upgrade/',
          destination: '/cli/start/workflows/#upgrade-amplify-cli',
          permanent: true
        },
        {
          source: '/cli/usage/uninnstall/',
          destination: '/cli/start/workflows/#uninstall-amplify-cli',
          permanent: true
        },
        {
          source: '/cli/graphql-transformer/:path*',
          destination: '/cli-legacy/graphql-transformer/:path*',
          permanent: true
        },
        {
          source: '/cli-legacy/',
          destination: '/cli/',
          permanent: true
        },
        {
          source: '/console/adminui/intro/',
          destination: '/console',
          permanent: true
        },
        {
          source: '/ui/customization/theming/q/framework/react/',
          destination: 'https://ui.docs.amplify.aws/react/theming', // updated from https://ui.docs.amplify.aws/theming to remove additional redirect once on UI
          permanent: true
        },
        {
          source: '/cli/hosting/',
          destination: '/cli/hosting/hosting',
          permanent: false
        },
        {
          // this path does not exist in Amplify UI
          source: '/ui/storage/s3-image-picker/q/framework/:path/',
          destination:
            'https://ui.docs.amplify.aws/components/storage?platform=:path#s3-image-picker',
          permanent: false
        },
        {
          source: '/cli/usage/uninstall/',
          destination: '/cli/start/workflows/#uninstall-amplify-cli',
          permanent: false
        },
        {
          // consolidated platform specific redirects
          source:
            '/guides/location-service/setting-up-your-app/q/platform/:platform/',
          destination: '/lib/geo/getting-started/q/platform/:platform/',
          permanent: true
        },
        {
          // consolidated platform specific redirects
          source:
            '/guides/location-service/tracking-device-location/q/platform/:platform/',
          destination: '/lib/geo/escapehatch/q/platform/:platform/',
          permanent: true
        },
        {
          // consolidated platform specific redirects
          source: '/lib/auth/social_signin_web_ui/q/platform/:platform/',
          destination: '/lib/auth/social/q/platform/:platform/',
          permanent: true
        },
        {
          source: '/start/q/integration/ionic/',
          destination: '/start/q/integration/js/',
          permanent: true
        },
        {
          source: '/start/getting-started/installation/q/integration/ionic/',
          destination: '/start/getting-started/installation/q/integration/js/',
          permanent: true
        },
        {
          source: '/lib/in-app-messaging/prerequisites/q/platform/:platform/',
          destination:
            '/lib/in-app-messaging/getting-started/q/platform/:platform/',
          permanent: true
        },
        {
          // consolidated platforms
          source: '/lib/devpreview/getting-started/q/platform/:platform/',
          destination: '/lib/project-setup/upgrade-guide/q/platform/:platform/',
          permanent: true
        },
        {
          source: '/cli/migration/lambda-node-version-update/',
          destination: '/cli/function/configure-options/#updating-the-runtime',
          permanent: true
        },
        {
          source: '/lib/in-app-messaging/customize/q/platform/js/',
          destination:
            'https://ui.docs.amplify.aws/react/connected-components/in-app-messaging',
          permanent: true
        },
        {
          // made not platform specific
          source: '/guides/storage/transfer-acceleration/q/platform/:platform/',
          destination:
            '/lib/storage/transfer-acceleration/q/platform/:platform/',
          permanent: true
        },
        {
          source: '/lib/auth/customui/q/platform/js/',
          destination:
            'https://ui.docs.amplify.aws/react/connected-components/authenticator',
          permanent: true
        },
        {
          source: '/lib/auth/customui/q/platform/react-native/',
          destination:
            'https://ui.docs.amplify.aws/react-native/connected-components/authenticator',
          permanent: true
        },
        {
          // made not platform specific
          source:
            '/lib/graphqlapi/create-or-re-use-existing-backend/q/platform/:platform',
          destination:
            '/lib/graphqlapi/existing-resources/q/platform/:platform/',
          permanent: true
        },
        {
          source: '/console/uibuilder/textfieldtoarea/',
          destination: '/console/uibuilder/figmatocode/#figma-file-changelog',
          permanent: true
        },
        {
          source: '/cli/graphql/offline-data-access-and-conflict-resolution/',
          destination: '/lib/datastore/conflict/q/platform/js/',
          permanent: true
        },
        {
          source: '/console/storage/develop',
          destination: '/console/storage/file-browser/',
          permanent: true
        },
        {
          source: '/cli/usage/add-custom-resources',
          destination: '/cli/custom/cdk/',
          permanent: true
        },
        {
          // made not platform specific
          source: '/lib/push-notifications/overview/q/platform/:platform/',
          destination:
            '/lib/push-notifications/getting-started/q/platform/:platform',
          permanent: false
        },
        {
          // made not platform specific
          source:
            '/lib/push-notifications/working-with-api/q/platform/:platform/',
          destination:
            '/lib/push-notifications/getting-started/q/platform/:platform',
          permanent: false
        },
        {
          source: '/ui/:path*',
          destination: 'https://ui.docs.amplify.aws/',
          permanent: true
        },
        {
          source: '/ui-legacy/:path*',
          destination: 'https://ui.docs.amplify.aws/',
          permanent: true
        },
        {
          // destination page doesn't exist
          source: '/ui-legacy/interactions/chatbot/:path*',
          destination: 'https://ui.docs.amplify.aws/components/chatbot',
          permanent: true
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

// eslint-disable-next-line @typescript-eslint/no-var-requires
const generatePathMap = require('./generatePathMap.cjs');
function exportPathMap(defaultPathMap, props) {
  return generatePathMap(directory);
}
