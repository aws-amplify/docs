import { Fragment } from 'react';
import FilterChildren from '../FilterChildren';
import { useLastUpdatedDatesContext } from '../LastUpdatedProvider';

type MdxFrontmatterType = {
  lastUpdated: string;
};

export default function Fragments({ fragments }) {
  const children: React.ReactNode[] = [];
  let frontmatter: MdxFrontmatterType;

  const { state, dispatch } = useLastUpdatedDatesContext();
  let filterKey = '';

  for (const key in fragments) {
    if (!filterKey) filterKey = key;
    const fragment = fragments[key]([]);
    frontmatter = fragment.props.frontmatter;

    if (frontmatter && frontmatter.lastUpdated) {
      if (
        state.files[key] === undefined ||
        (state.files[key] &&
          !state.files[key].includes(frontmatter.lastUpdated))
      ) {
        dispatch({
          type: 'update',
          key: key,
          lastUpdated: frontmatter.lastUpdated
        });
      }
    }

    children.push(<Fragment key={key}>{fragment}</Fragment>);
  }

  return <FilterChildren filterKey={filterKey}>{children}</FilterChildren>;
}
