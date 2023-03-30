import { autocomplete } from '@algolia/autocomplete-js';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import algoliasearch from 'algoliasearch';

import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';

import { pipe } from 'ramda';

import { groupBy, limit, uniqBy } from './functions/index';
import { useRouter } from 'next/router';

const appId = 'W6Q5N5WUDV';
const apiKey = '953b9e801f385c3c689fc8e94690ab43';
const searchIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX
  ? process.env.NEXT_PUBLIC_ALGOLIA_INDEX
  : 'custom_search_staging';
const searchClient = algoliasearch(appId, apiKey);

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'search',
  limit: 20
});
const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: searchIndex,
  getSearchParams() {
    return {
      hitsPerPage: 20
    };
  }
});

const dedupeAndLimitSuggestions = pipe(
  uniqBy(({ source, item }) =>
    source.sourceId === 'querySuggestionsPlugin' ? item.query : item.title
  ),
  limit(10)
);

const groupByCategory = function(router) {
  return groupBy(
    (hit) => hit.category,
    {
      getSource({ name, items }) {
        return {
          getItems() {
            return items;
          },
          templates: {
            header() {
              return (
                <>
                  <span className="aa-SourceHeaderTitle">{name}</span>
                  <div className="aa-SourceHeaderLine" />
                </>
              );
            }
          }
        };
      }
    },
    router.query?.platform || router.query?.integration
  );
};

export function Autocomplete(props) {
  const containerRef = useRef(null);
  const panelRootRef = useRef(null);
  const rootRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      container: containerRef.current,
      renderer: { createElement, Fragment, render: () => [] },
      plugins: [recentSearchesPlugin, querySuggestionsPlugin],
      getSources({ query }) {
        if (!query) {
          return [];
        }
      },
      reshape({ sourcesBySourceId }) {
        const {
          recentSearchesPlugin,
          querySuggestionsPlugin,
          products,
          ...rest
        } = sourcesBySourceId;

        return [
          dedupeAndLimitSuggestions(),
          groupByCategory(router)(products),
          Object.values(rest)
        ];
      },
      render({ children }, root) {
        if (!panelRootRef.current || rootRef.current !== root) {
          rootRef.current = root;

          panelRootRef.current?.unmount();
          panelRootRef.current = createRoot(root);
        }

        panelRootRef.current.render(children);      },
      ...props
    });

    return () => {
      search.destroy();
    };
  }, []);

  return <div ref={containerRef} />;
}
