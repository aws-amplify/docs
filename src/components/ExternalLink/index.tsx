import {ExternalLink, ExternalLinkGraphic} from "./styles";

export default function DocsExternalLink({children, graphic, href}) {
  return (
    <ExternalLink href={href} rel="noopener noreferrer" target="_blank">
      {children}
      {graphic && <ExternalLinkGraphic src={`/external-link-${graphic}.svg`} />}
    </ExternalLink>
  );
}
