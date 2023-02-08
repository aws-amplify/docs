import FilterChildren from '../FilterChildren';
import { useLastUpdatedDatesContext } from '../LastUpdatedProvider';

type MdxFrontmatter = {
  lastUpdated: string;
  relativeFilePath: string;
};

export default function Fragments({ fragments }) {
  const children = [];
  let frontmatter: MdxFrontmatter;

  const { state, dispatch } = useLastUpdatedDatesContext();

  for (const key in fragments) {
    const fragment = fragments[key]([]);
    frontmatter = fragment.props.frontmatter;

    let value;
    if (
      frontmatter &&
      frontmatter.relativeFilePath &&
      frontmatter.lastUpdated
    ) {
      value = `${frontmatter.relativeFilePath}____${frontmatter.lastUpdated}`;
    }

    if (
      (value && state.files[key] === undefined) ||
      (state.files[key] && !state.files[key].includes(value))
    ) {
      dispatch({
        type: 'update',
        key: key,
        filePath: frontmatter.relativeFilePath,
        lastUpdated: frontmatter.lastUpdated
      });
    }

    children.push(<div key={key}>{fragment}</div>);
  }

  return <FilterChildren>{children}</FilterChildren>;
}
