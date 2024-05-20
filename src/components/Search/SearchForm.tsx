import React, { useState, useRef } from 'react';
import { useSearchBox, useInstantSearch } from 'react-instantsearch';
import { Button, Flex, TextField } from '@aws-amplify/ui-react';
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
    <Flex
      as="form"
      action=""
      gap="xs"
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
        labelHidden={true}
        ref={inputRef}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        placeholder="Search"
        spellCheck={false}
        maxLength={512}
        flex="1 0 auto"
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
    </Flex>
  );
};
