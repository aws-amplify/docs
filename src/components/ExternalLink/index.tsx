import React from "React";
import {ExternalLink, ExternalLinkGraphic} from "./styles";

type ExternalLinkProps = {
  graphic?: string;
  href: string;
};

const DocsExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  graphic,
  href,
}) => {
  return (
    <ExternalLink href={href} rel="noopener noreferrer" target="_blank">
      {children}
      {graphic && <ExternalLinkGraphic src={`/external-link-${graphic}.svg`} />}
    </ExternalLink>
  );
};

export default DocsExternalLink;
