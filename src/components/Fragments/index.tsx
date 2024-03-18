import { Fragment } from 'react';
import FilterChildren from '../FilterChildren';

export default function Fragments({ fragments }) {
  const children: React.ReactNode[] = [];

  let filterKey = '';

  for (const key in fragments) {
    if (!filterKey) filterKey = key;
    const fragment = fragments[key]([]);

    children.push(<Fragment key={key}>{fragment}</Fragment>);
  }

  return <FilterChildren filterKey={filterKey}>{children}</FilterChildren>;
}
