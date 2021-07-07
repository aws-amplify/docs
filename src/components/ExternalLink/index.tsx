import React from "react";
import {ExternalLinkGraphic} from "./styles";
import {track, trackExternalLink, AnalyticsEventType} from "../../utils/track";

type ExternalLinkProps = {
  graphic?: string;
  href: string;
  anchorTitle?: string;
};

const ExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  graphic,
  href,
  anchorTitle,
}) => {
  return (
    <a
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
    </a>
  );
};

export default ExternalLink;

function trackLink(href) {
  track({
    type: AnalyticsEventType.EXTERNAL_LINK_CLICK,
    attributes: {from: location.href, to: href},
  });
  trackExternalLink(href);
}
