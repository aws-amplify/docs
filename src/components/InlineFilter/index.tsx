import type React from 'react';
import FilterChildren from '../FilterChildren';

type InlineFilterProps = {
  children: JSX.Element
  filters?: string[]
  filter?: string
}

export default function InlineFilter({ filter, filters, children }: InlineFilterProps) {
  if (filter && filters) {
    throw new Error("Can't set both `filter` and `filters` props.")
  }

  if (!filter && !filters) {
    throw new Error("You must set either `filter` or the `filters` prop in the InlineFilter component.")
  }

  const filteredChildren: Array<React.JSX.Element> = []
  if (filter) {
    filteredChildren.push(<div key={filter}>{children}</div>)
  }
  
  if (filters) {
    if (filters.length < 1) {
      throw new Error("You must pass at least one value into the filters property. Example: filters={['js']}.")
    }

    filters.forEach(filter => {
      filteredChildren.push(<div key={filter}>{children}</div>)
    })
  }
  return <FilterChildren>{filteredChildren}</FilterChildren>;
}
