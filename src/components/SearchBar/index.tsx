import React from 'react';
import { getAlgoliaResults } from '@algolia/autocomplete-js';
import algoliasearch from 'algoliasearch';

import { Autocomplete } from './Autocomplete';
import { SearchItem } from './SearchItem';
import { Search } from './styles';

import { useRouter } from 'next/router';

const appId = 'W6Q5N5WUDV';
const apiKey = 'a82ff7ed9cd894525d84229ba4a886db';
const searchClient = algoliasearch(appId, apiKey);

function App() {
  const router = useRouter();

  return (
    <Search>
      <Autocomplete
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
                    indexName: 'custom_search_staging',
                    query,
                    params: {
                      hitsPerPage: 6
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
