import FilterChildren from '../FilterChildren';

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
    filteredChildren.push(<div key={filter}>{children}</div>);
  });

  return <FilterChildren>{filteredChildren}</FilterChildren>;
}
