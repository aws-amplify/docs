import {Search} from "./styles";
import {useEffect} from "react";
import Head from "next/head";

import {
  ALGOLIA_API_KEY,
  ALGOLIA_INDEX_NAME,
  UNINITIALIZED_SEARCH_INPUT_SELECTOR,
} from "../../constants/algolia";

export default function SearchBar() {
  useEffect(() => {
    if (window.docsearch) {
      window.docsearch({
        apiKey: ALGOLIA_API_KEY,
        indexName: ALGOLIA_INDEX_NAME,
        inputSelector: UNINITIALIZED_SEARCH_INPUT_SELECTOR,
        debug: false,
        // queryHook: setSearchQuery,
        // handleSelected: trackSearchQuery,
        // transformData,
        algoliaOptions: {
          hitsPerPage: 10,
        },
      });
    }
  }, []);

  return (
    <>
      <Head>
        <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2.6.3/dist/cdn/docsearch.min.js"></script>
      </Head>
      <Search>
        <div>
          <div>
            <input
              id="amplify-docs-search-input"
              className="three-dee-effect"
              type="search"
              placeholder="Search"
            />
            <img src="/search.svg" alt="search" />
          </div>
        </div>
      </Search>
    </>
  );
}
