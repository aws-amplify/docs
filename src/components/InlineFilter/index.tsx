import { Fragment } from 'react';
import FilterChildren from '../FilterChildren';
import { JS_PLATFORMS } from '@/data/platforms';

type InlineFilterProps = {
  children: React.ReactNode;
  filters: string[];
};

export default function InlineFilter({ filters, children }: InlineFilterProps) {
  if (!filters || !Array.isArray(filters) || filters.length < 1) {
    return <></>;
  }

  const filteredChildren: Array<React.JSX.Element> = [];

  filters.forEach((filter) => {
    if (filter === 'all-javascript') {
      JS_PLATFORMS.forEach((platform) => {
        filteredChildren.push(<Fragment key={platform}>{children}</Fragment>);
      });
    } else {
      filteredChildren.push(<Fragment key={filter}>{children}</Fragment>);
    }
  });

  return <FilterChildren>{filteredChildren}</FilterChildren>;
}
