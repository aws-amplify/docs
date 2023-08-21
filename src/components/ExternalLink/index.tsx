import React from 'react';
import { ExternalLinkGraphic } from './styles';
import { trackExternalLink } from '../../utils/track';

type ExternalLinkProps = {
  graphic?: string;
  href: string;
  anchorTitle?: string;
};

const ExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  graphic,
  href,
  anchorTitle
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
        <ExternalLinkGraphic
          alt="External link"
          src={`/assets/external-link-${graphic}.svg`}
          width="8"
          height="8"
        />
      )}
    </a>
  );
};

export default ExternalLink;

function trackLink(href) {
  trackExternalLink(href);
}
