import FilterChildren from '../FilterChildren';
import { useLastUpdatedDatesContext } from '../LastUpdatedProvider';
import { MdxFrontmatterType } from '../Page';

export default function Fragments({ fragments }) {
  const children = [];
  let frontmatter: MdxFrontmatterType;

  const { state, dispatch } = useLastUpdatedDatesContext();

  for (const key in fragments) {
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

    children.push(<div key={key}>{fragment}</div>);
  }

  return <FilterChildren>{children}</FilterChildren>;
}
