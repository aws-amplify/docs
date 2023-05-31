import React from 'react';
import { ExternalLinkGraphic } from './styles';
import { trackExternalLink } from '../../utils/track';
import { ExternalLinkIcon } from '../Icons';

type ExternalLinkProps = {
  graphic?: string;
  href: string;
  anchorTitle?: string;
  icon?: boolean;
};

const ExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  graphic,
  href,
  anchorTitle,
  icon
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
        />
      )}
      {icon && <ExternalLinkIcon />}
    </a>
  );
};

export default ExternalLink;

function trackLink(href) {
  trackExternalLink(href);
}
