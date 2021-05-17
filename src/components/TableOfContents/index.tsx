import {slug} from "../../utils/slug";
import {TOCStyle, H2AnchorStyle, H3AnchorStyle, HeaderStyle} from "./styles";

export default function TableOfContents({children, title}) {
  return (
    <TOCStyle>
      <HeaderStyle>{title}</HeaderStyle>
      {children.map(([name, level], index) => {
        const slugged = `#${slug(name)}`;
        const anchor = <a href={slugged}>{name}</a>;
        if (level === "h2")
          return <H2AnchorStyle key={index}>{anchor}</H2AnchorStyle>;
        else return <H3AnchorStyle key={index}>{anchor}</H3AnchorStyle>;
      })}
    </TOCStyle>
  );
}
