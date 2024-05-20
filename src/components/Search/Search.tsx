import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { SearchForm } from './SearchForm';
import { InstantSearch, Hits } from 'react-instantsearch';
import { Hit } from './Hit';

const searchClient = algoliasearch(
  'HBI6AAVZLI',
  'de8634c2f3bcb5e46ea2b9debb77656d'
);

function HitComponent({ hit }) {
  return JSON.stringify(hit);
}

export const Search = () => {
  return (
    <InstantSearch
      future={{
        preserveSharedStateOnUnmount: true
      }}
      searchClient={searchClient}
      indexName="next-amplify"
    >
      <SearchForm />
      <Hits hitComponent={HitComponent} />
    </InstantSearch>
  );
};
