import { autocomplete } from '@algolia/autocomplete-js';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import algoliasearch from 'algoliasearch';

import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { render } from 'react-dom';

import { pipe } from 'ramda';

import { groupBy, limit, uniqBy } from './functions/index';

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

const groupByCategory = groupBy((hit) => hit.category, {
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
});

export function Autocomplete(props) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) {
      return undefined;
    }

    const search = autocomplete({
      detachedMediaQuery: '',
      container: containerRef.current,
      renderer: { createElement, Fragment },
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
          groupByCategory(products),
          Object.values(rest)
        ];
      },
      render({ children }, root) {
        render(children, root);
      },
      ...props
    });

    return () => {
      search.destroy();
    };
  }, [props]);

  return <div ref={containerRef} />;
}
