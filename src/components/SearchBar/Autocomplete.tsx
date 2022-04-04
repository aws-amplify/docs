import { autocomplete } from '@algolia/autocomplete-js';
import React, { createElement, Fragment, useEffect, useRef } from 'react';
import { render } from 'react-dom';

import { pipe } from 'ramda';

import { groupBy, limit, uniqBy } from './functions';

const dedupeAndLimitSuggestions = pipe(
  uniqBy(({ source, item }) => item.category),
  limit(4)
);

const isPropValuesEqual = (subject, target, propNames) =>
  propNames.every((propName) => subject[propName] === target[propName]);

const getUniqueItemsByProperties = (items, propNames) => {
  const propNamesArray = Array.from(propNames);

  return items.filter(
    (item, index, array) =>
      index ===
      array.findIndex((foundItem) =>
        isPropValuesEqual(foundItem, item, propNamesArray)
      )
  );
};

const groupByCategory = groupBy((hit) => hit.category, {
  getSource({ name, items }) {
    return {
      getItems() {
        // items = getUniqueItemsByProperties(items, 'heading');
        return items.slice(0, 10);
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
      reshape({ sourcesBySourceId }) {
        const {
          // recentSearchesPlugin,
          // querySuggestionsPlugin,
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
