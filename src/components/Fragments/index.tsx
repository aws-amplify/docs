import FilterChildren from "../FilterChildren";

export default function Fragments({fragments}) {
  const children = [];
  let frontmatter;
  for (const key in fragments) {
    const fragment = fragments[key]([]);
    frontmatter = fragment.props.frontmatter;
    children.push(<div key={key}>{fragment}</div>);
  }

  return <FilterChildren frontmatter={frontmatter}>{children}</FilterChildren>;
}
