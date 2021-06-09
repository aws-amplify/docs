import React from "react";
import {ExternalLink, ExternalLinkGraphic} from "./styles";
import {track, trackExternalLink, AnalyticsEventType} from "../../utils/track";

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
    <ExternalLink
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      onClick={trackLink}
    >
      {children}
      {graphic && (
        <ExternalLinkGraphic src={`/assets/external-link-${graphic}.svg`} />
      )}
    </ExternalLink>
  );
};

export default DocsExternalLink;

function trackLink(e) {
  e.preventDefault();
  const href = e.target.getAttribute("href");

  track({
    type: AnalyticsEventType.EXTERNAL_LINK_CLICK,
    attributes: {from: location.href, to: href},
  });
  trackExternalLink(href);

  window.location.href = href;
}
