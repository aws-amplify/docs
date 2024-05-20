import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { SearchForm } from './SearchForm';
import { InstantSearch, Hits } from 'react-instantsearch';

const searchClient = algoliasearch(
  'HBI6AAVZLI',
  'de8634c2f3bcb5e46ea2b9debb77656d'
);

function Hit({ hit }) {
  return JSON.stringify(hit);
}

export const Search = () => {
  return (
    <InstantSearch searchClient={searchClient} indexName="next-amplify">
      <SearchForm />
      <Hits hitComponent={Hit} />
    </InstantSearch>
  );
};
