import React, { useEffect } from 'react';
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
  className
}) => {
  const [label, setLabel] = React.useState('');

  useEffect(() => {
    const links = document.getElementsByTagName('a');

    const externalButtons = Array.from(links).filter((link) => {
      return (
        !link.classList.contains('amplify-button') &&
        link.hostname != window.location.hostname
      );
    });

    for (const externalButton of externalButtons) {
      if (externalButton.href == href) setLabel(externalButton.innerText);
    }
  }, [href]);

  return (
    <a
      href={href}
      className={className}
      aria-label={label + ' (opens in new tab)'}
      rel="noopener noreferrer"
      target="_blank"
      onClick={() => {
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
