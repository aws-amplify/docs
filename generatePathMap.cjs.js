// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs');

function generatePathMap(
  obj,
  pathMap = {
    '/': {
      page: '/'
    },
    '/404': {
      page: '/404'
    },
    '/start': {
      page: '/start'
    },
    '/start/q/integration/js': {
      page: '/start/q/integration/[integration]'
    },
    '/start/q/integration/react': {
      page: '/start/q/integration/[integration]'
    },
    '/start/q/integration/angular': {
      page: '/start/q/integration/[integration]'
    },
    '/start/q/integration/vue': {
      page: '/start/q/integration/[integration]'
    },
    '/start/q/integration/next': {
      page: '/start/q/integration/[integration]'
    },
    '/start/q/integration/android': {
      page: '/start/q/integration/[integration]'
    },
    '/start/q/integration/react-native': {
      page: '/start/q/integration/[integration]'
    },
    '/start/q/integration/ios': {
      page: '/start/q/integration/[integration]'
    },
    '/start/q/integration/flutter': {
      page: '/start/q/integration/[integration]'
    },
    '/lib/q/platform/flutter': {
      page: '/lib/q/platform/[platform]'
    },
    '/lib/q/platform/android': {
      page: '/lib/q/platform/[platform]'
    },
    '/lib/q/platform/ios': {
      page: '/lib/q/platform/[platform]'
    },
    '/lib/q/platform/js': {
      page: '/lib/q/platform/[platform]'
    },
    '/lib/q/platform/react-native': {
      page: '/lib/q/platform/[platform]'
    },
    '/lib-v1/q/platform/android': {
      page: '/lib-v1/q/platform/[platform]'
    },
    '/lib-v1/q/platform/ios': {
      page: '/lib-v1/q/platform/[platform]'
    },
    '/lib-v1/q/platform/flutter': {
      page: '/lib-v1/q/platform/[platform]'
    },
    '/lib-v1/q/platform/js': {
      page: '/lib-v1/q/platform/[platform]'
    },
    '/lib-v1/q/platform/react-native': {
      page: '/lib-v1/q/platform/[platform]'
    },
    '/sdk/q/platform/js': {
      page: '/sdk/q/platform/[platform]'
    },
    '/sdk/q/platform/android': {
      page: '/sdk/q/platform/[platform]'
    },
    '/sdk/q/platform/ios': {
      page: '/sdk/q/platform/[platform]'
    },
    '/sdk/q/platform/flutter': {
      page: '/sdk/q/platform/[platform]'
    },
    '/sdk/q/platform/react-native': {
      page: '/sdk/q/platform/[platform]'
    },
    '/console': {
      page: '/console'
    },
    '/cli': {
      page: '/cli'
    },
    '/cli/function': {
      page: '/cli/function'
    },
    '/flutter-references': {
      page: '/flutter-references'
    },
    '/contribute': {
      page: '/contribute'
    },
    '/contribute/getting-started': {
      page: '/contribute/getting-started'
    }
  },
  removeChoosePages = false //this flag if set will generate a pathmap without the choose platform pages
) {
  for (const [_, value] of Object.entries(obj)) {
    const { items, filters, route, productRoot } = value;

    if (productRoot) {
      const { route } = productRoot;

      let filterKind = '';
      if (route.startsWith('/cli') || route.startsWith('/console')) {
        filterKind = '';
      } else if (route.startsWith('/lib')) {
        filterKind = 'platform';
      } else if (route.startsWith('/sdk')) {
        filterKind = 'platform';
      } else if (route.startsWith('/ui')) {
        filterKind = 'framework';
      } else if (route.startsWith('/guides')) {
        filterKind = 'platform';
      } else if (route.startsWith('/start')) {
        filterKind = 'integration';
      }
    }

    if (items) {
      generatePathMap(items, pathMap, removeChoosePages);
    }

    if (!filters || !filters.length) {
      let page = '';
      const mdxSrc = `${route}.mdx`;
      const tsxSrc = `${route}.tsx`;

      const maybeMDXFile = './src/pages' + mdxSrc;
      const maybeTSXFile = './src/pages' + tsxSrc;

      if (fs.existsSync(maybeTSXFile)) {
        page = tsxSrc;
      } else if (fs.existsSync(maybeMDXFile)) {
        page = mdxSrc;
      }

      if (page.length) {
        pathMap[route] = {
          page: route
        };
      }

      continue;
    }

    let page = '';
    let routeType = '';
    ['platform', 'framework', 'integration'].forEach((type) => {
      const src = `${route}/q/${type}/[${type}].mdx`;
      const maybeFile = './src/pages' + src;
      if (fs.existsSync(maybeFile)) {
        page = src;
        routeType = type;
      }
    });

    if (!page || !routeType) {
      continue;
    }

    // generate for _all_ filters -- unsupported filters will just generate ChooseFilterPages, which is what we want
    // ideally misspellings would also map to a ChooseFilterPage, but this doesn't work with SSG
    let allFilters = filters;
    if (routeType !== '') {
      allFilters = [
        'js',
        'android',
        'ios',
        'flutter',
        'react',
        'react-native',
        'angular',
        'vue',
        'next'
      ];
    }
    if (removeChoosePages) {
      // reset the allFilters to the filters found in the directory object, this will remove the choose platform pages from the pathmap being generated
      allFilters = filters;
    }
    allFilters.forEach((filter) => {
      pathMap[route + '/q/' + routeType + '/' + filter] = {
        page: `${route}/q/${routeType}/[${routeType}]`
      };
    });
  }
  return pathMap;
}
module.exports = generatePathMap;
