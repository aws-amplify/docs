import type React from 'react';
import FilterChildren from '../FilterChildren';

export default function InlineFilter({ filter, filters, children }) {
  if (filter && filters) {
    throw new Error("Can't set both `filter` and `filters` props.")
  }

  const filteredChildren: Array<React.JSX.Element> = []
  if (filter) {
    filteredChildren.push(<div key={filter}>{children}</div>)
  } else {
    filters.forEach(filter => {
      filteredChildren.push(<div key={filter}>{children}</div>)
    })
  }
  return <FilterChildren>{filteredChildren}</FilterChildren>;
}