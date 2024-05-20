import React, { useState, useRef } from 'react';
import { useSearchBox, useInstantSearch } from 'react-instantsearch';
import { Button, TextField } from '@aws-amplify/ui-react';
export const SearchForm = (props) => {
  const { query, refine } = useSearchBox(props);
  const { status } = useInstantSearch();
  const [inputValue, setInputValue] = useState(query);
  const inputRef = useRef<HTMLInputElement>(null);

  const isSearchStalled = status === 'stalled';

  function setQuery(newQuery: string) {
    setInputValue(newQuery);

    refine(newQuery);
  }
  return (
    <form
      action=""
      role="search"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        if (inputRef.current) {
          inputRef.current.blur();
        }
      }}
      onReset={(event) => {
        event.preventDefault();
        event.stopPropagation();

        setQuery('');

        if (inputRef.current) {
          inputRef.current.focus();
        }
      }}
    >
      <TextField
        label="Search docs"
        ref={inputRef}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Search"
        spellCheck={false}
        maxLength={512}
        type="search"
        value={inputValue}
        onChange={(event) => {
          setQuery(event.currentTarget.value);
        }}
      />
      <Button type="submit">Submit</Button>
      {/* <button type="reset" hidden={inputValue.length === 0 || isSearchStalled}>
        Reset
      </button> */}
      <span hidden={!isSearchStalled}>Searching…</span>
    </form>
  );
};
