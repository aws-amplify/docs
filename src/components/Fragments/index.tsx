import FilterChildren from "../FilterChildren";

export default function Fragments({fragments}) {
  const children = [];
  for (const key in fragments) {
    const fragment = fragments[key]([]);
    children.push(<div key={key}>{fragment}</div>);
  }

  return <FilterChildren>{children}</FilterChildren>;
}
