import React from "react";
import {ExternalLink, ExternalLinkGraphic} from "./styles";
import {track, trackExternalLink, AnalyticsEventType} from "../../utils/track";

type ExternalLinkProps = {
  graphic?: string;
  href: string;
  anchorTitle?: string;
};

const DocsExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  graphic,
  href,
  anchorTitle,
}) => {
  return (
    <ExternalLink
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      title={anchorTitle}
      onClick={(e) => {
        trackLink(href);
      }}
    >
      {children}
      {graphic && (
        <ExternalLinkGraphic src={`/assets/external-link-${graphic}.svg`} />
      )}
    </ExternalLink>
  );
};

export default DocsExternalLink;

function trackLink(href) {
  track({
    type: AnalyticsEventType.EXTERNAL_LINK_CLICK,
    attributes: {from: location.href, to: href},
  });
  trackExternalLink(href);
}
