import type { Platform } from '@/constants/platforms';
import { Fragment } from 'react';
import FilterChildren from '../FilterChildren';

type InlineFilterProps = {
  children: React.ReactNode;
  filters: Platform[];
};

export default function InlineFilter({ filters, children }: InlineFilterProps) {
  if (!filters || !Array.isArray(filters) || filters.length < 1) {
    return <></>;
  }

  const filteredChildren = filters.map((filter) => (
    <Fragment key={filter}>{children}</Fragment>
  ));

  return <FilterChildren>{filteredChildren}</FilterChildren>;
}
