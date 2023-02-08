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
    // USE THE KEY TO CREATE THE OBJECT?

    const fragment = fragments[key]([]);
    frontmatter = fragment.props.frontmatter;
    console.log(frontmatter);

    const value = `${frontmatter.relativeFilePath}____${frontmatter.lastUpdated}`;

    if (state.files[key] === undefined || !state.files[key].includes(value)) {
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
