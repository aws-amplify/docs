import React from 'react';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';

import { Autocomplete } from './Autocomplete';
import { SearchItem } from './SearchItem';
import { Search } from './styles';

import { useRouter } from 'next/router';

const appId = 'W6Q5N5WUDV';
const apiKey = '953b9e801f385c3c689fc8e94690ab43';
const searchIndex = process.env.NEXT_PUBLIC_ALGOLIA_INDEX
  ? process.env.NEXT_PUBLIC_ALGOLIA_INDEX
  : 'custom_search_staging';
const searchClient = algoliasearch(appId, apiKey);

function App() {
  const router = useRouter();

  return (
    <Search aria-label="Search the Amplify docs site">
      <Autocomplete
        placeholder="Search Docs"
        openOnFocus={false}
        getSources={({ query }) => [
          {
            sourceId: 'products',
            getItemUrl({ item }) {
              return item.slug;
            },
            getItems({ query }) {
              return getAlgoliaResults({
                searchClient,
                queries: [
                  {
                    indexName: searchIndex,
                    query,
                    params: {
                      hitsPerPage: 20
                    }
                  }
                ]
              });
            },
            templates: {
              item({ item, components }) {
                return <SearchItem hit={item} components={components} />;
              }
            }
          }
        ]}
        navigator={{
          navigate({ itemUrl }) {
            // Pressing "enter"
            router.push(itemUrl);
          },
          navigateNewTab({ itemUrl }) {
            // Pressing "ctrl"/"cmd" + "enter"
            window.open(window.location.origin + itemUrl, '_blank', 'noopener');
          },
          navigateNewWindow({ itemUrl }) {
            // Pressing "shift" + "enter"
            window.open(window.location.origin + itemUrl, '_blank', 'noopener');
          }
        }}
      />
    </Search>
  );
}

export default App;
