import { autocomplete } from '@algolia/autocomplete-js';
import { createQuerySuggestionsPlugin } from '@algolia/autocomplete-plugin-query-suggestions';
import { createLocalStorageRecentSearchesPlugin } from '@algolia/autocomplete-plugin-recent-searches';
import algoliasearch from 'algoliasearch';

import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { render } from 'react-dom';

import { pipe } from 'ramda';

import { groupBy, limit, uniqBy } from './functions/index';

const appId = 'W6Q5N5WUDV';
const apiKey = 'a82ff7ed9cd894525d84229ba4a886db';
const searchClient = algoliasearch(appId, apiKey);

const recentSearchesPlugin = createLocalStorageRecentSearchesPlugin({
  key: 'search',
  limit: 10
});
const querySuggestionsPlugin = createQuerySuggestionsPlugin({
  searchClient,
  indexName: 'custom_search_staging',
  getSearchParams() {
    return {
      hitsPerPage: 10
    };
  }
});

const dedupeAndLimitSuggestions = pipe(
  uniqBy(({ source, item }) =>
    source.sourceId === 'querySuggestionsPlugin' ? item.query : item.title
  ),
  limit(4)
);

const groupByCategory = groupBy((hit) => hit.category, {
  getSource({ name, items }) {
    return {
      getItems() {
        return items.slice(0, 3);
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
      container: containerRef.current,
      renderer: { createElement, Fragment },
      plugins: [recentSearchesPlugin, querySuggestionsPlugin],
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
