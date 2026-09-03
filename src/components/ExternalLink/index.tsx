import React, { useEffect, useRef } from 'react';
import { trackExternalLink } from '../../utils/track';

type ExternalLinkProps = {
  children: React.ReactNode;
  graphic?: string;
  href: string;
  anchorTitle?: string;
  icon?: boolean;
  className?: string;
  /**
   * @default 'noopener noreferrer'
   */
  rel?: string;
};

const ExternalLink: React.FC<ExternalLinkProps> = ({
  children,
  href,
  className,
  rel
}) => {
  const [label, setLabel] = React.useState('');
  const linkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (linkRef.current) {
      const text = linkRef.current.innerText;
      setLabel(text ? text : '');
    }
  }, []);

  return (
    <a
      href={href}
      className={className}
      aria-label={label + ' (opens in new tab)'}
      rel={rel || 'noopener noreferrer'}
      target="_blank"
      onClick={() => {
        trackLink(href);
      }}
      ref={linkRef}
    >
      {children}
    </a>
  );
};

export default ExternalLink;

function trackLink(href) {
  trackExternalLink(href);
}
