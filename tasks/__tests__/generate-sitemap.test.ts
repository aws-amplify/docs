import { xmlUrlNode, findCanonicalPage } from '../generate-sitemap.mjs';
import { PLATFORMS } from '@/data/platforms';

jest.mock('node:crypto', () => {
  return {};
});

const flatDirectoryMock = {
  '/[platform]/deploy-and-host/fullstack-branching/cross-account-deployments': {
    path: 'src/pages/[platform]/deploy-and-host/fullstack-branching/cross-account-deployments/index.mdx',
    title: 'Cross-account deployments',
    description:
      'Set up a cross-account deployment pipeline powered by Amazon CodeCatalyst and AWS Amplify Hosting.',
    platforms: [
      'android',
      'angular',
      'flutter',
      'javascript',
      'nextjs',
      'react',
      'react-native',
      'swift',
      'vue'
    ],
    lastUpdated: '2024-03-18T14:51:00.000Z',
    route:
      '/[platform]/deploy-and-host/fullstack-branching/cross-account-deployments'
  },
  '/gen1/[platform]/start/getting-started/introduction': {
    path: 'src/pages/gen1/[platform]/start/getting-started/introduction/index.mdx',
    title: 'Introduction',
    description: 'Getting started with Amplify',
    disableTOC: 'true',
    platforms: [
      'angular',
      'flutter',
      'javascript',
      'nextjs',
      'swift',
      'react',
      'react-native',
      'vue',
      'android'
    ],
    lastUpdated: '2024-03-23T00:11:40.000Z',
    route: '/gen1/[platform]/start/getting-started/introduction'
  }
};
jest.mock('@/directory/flatDirectory.json', () => flatDirectoryMock);

describe('generate-sitemap', () => {
  describe('xmlUrlNode', () => {
    it('should return a valid xml node', () => {
      const htmlPageData = [
        '/react/build-a-backend/',
        '2022-05-12T16:00:00.000Z'
      ];

      const result = xmlUrlNode(htmlPageData, 'https://docs.amplify.aws');

      expect(result).toEqual(
        `
<url>
  <loc>https://docs.amplify.aws/react/build-a-backend/</loc>
  <lastmod>2022-05-12T16:00:00+0:00</lastmod>
  <changefreq>hourly</changefreq>
  <priority>0.5</priority>
</url>`
      );
    });
  });

  describe('findCanonicalPage', () => {
    it('should find the canonical page based on the platforms ranking', () => {
      const pages = PLATFORMS.map(
        (platform) =>
          `/${platform}/deploy-and-host/fullstack-branching/cross-account-deployments/index.html`
      );

      const result = findCanonicalPage(pages);

      expect(result).toEqual({
        directoryObject: {
          path: 'src/pages/[platform]/deploy-and-host/fullstack-branching/cross-account-deployments/index.mdx',
          title: 'Cross-account deployments',
          description:
            'Set up a cross-account deployment pipeline powered by Amazon CodeCatalyst and AWS Amplify Hosting.',
          platforms: [
            'android',
            'angular',
            'flutter',
            'javascript',
            'nextjs',
            'react',
            'react-native',
            'swift',
            'vue'
          ],
          lastUpdated: '2024-03-18T14:51:00.000Z',
          route:
            '/[platform]/deploy-and-host/fullstack-branching/cross-account-deployments'
        },
        canonicalPageName:
          '/react/deploy-and-host/fullstack-branching/cross-account-deployments/'
      });
    });

    it('should find the canonical page for gen 1 pages', () => {
      const pages = [
        '/gen1/javascript/start/getting-started/introduction/index.html',
        '/gen1/nextjs/start/getting-started/introduction/index.html'
      ];

      const result = findCanonicalPage(pages);

      expect(result).toEqual({
        directoryObject: {
          path: 'src/pages/gen1/[platform]/start/getting-started/introduction/index.mdx',
          title: 'Introduction',
          description: 'Getting started with Amplify',
          disableTOC: 'true',
          platforms: [
            'angular',
            'flutter',
            'javascript',
            'nextjs',
            'swift',
            'react',
            'react-native',
            'vue',
            'android'
          ],
          lastUpdated: '2024-03-23T00:11:40.000Z',
          route: '/gen1/[platform]/start/getting-started/introduction'
        },
        canonicalPageName:
          '/gen1/javascript/start/getting-started/introduction/'
      });
    });
  });
});
