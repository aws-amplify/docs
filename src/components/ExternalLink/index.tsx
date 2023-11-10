import React from 'react';
import { trackExternalLink } from '../../utils/track';

type ExternalLinkProps = {
  children: React.ReactNode;
  graphic?: string;
  href: string;
  anchorTitle?: string;
  icon?: boolean;
  className?: string;
};

const ExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  href,
  anchorTitle,
  icon,
  className
}) => {
  return (
    <a
      href={href}
      className={className}
      rel="noopener noreferrer"
      target="_blank"
      title={anchorTitle}
      onClick={(e) => {
        trackLink(href);
      }}
    >
      {children}
    </a>
  );
};

export default ExternalLink;

function trackLink(href) {
  trackExternalLink(href);
}
