import { Button, ButtonProps } from '@aws-amplify/ui-react';
import { IconExternalLink } from '../Icons';
import { trackExternalLink } from '../../utils/track';
import { useEffect } from 'react';
import React from 'react';

interface ExternalLinkButtonProps {
  variation?: ButtonProps['variation'];
  size?: ButtonProps['size'];
  children?: React.ReactNode;
  className?: string;
  href?: string;
}

function trackLink(href) {
  trackExternalLink(href);
}

export const ExternalLinkButton = ({
  variation,
  size,
  href,
  children,
  className
}: ExternalLinkButtonProps) => {
  const [label, setLabel] = React.useState('');

  useEffect(() => {
    const links = document.getElementsByTagName('a');
    const externalButtons = Array.from(links).filter((link) => {
      return (
        link.classList.contains('amplify-button') &&
        link.hostname != window.location.hostname
      );
    });

    for (const externalButton of externalButtons) {
      if (externalButton.href == href) setLabel(externalButton.innerText || '');
    }
  }, [href, label]);

  return (
    <Button
      href={href}
      variation={variation}
      gap="small"
      rel="noopener noreferrer"
      target="_blank"
      size={size}
      as="a"
      align-items="center"
      className={className}
      aria-label={label + ' (opens in new tab)'}
      onClick={() => {
        trackLink(href);
      }}
    >
      {children} <IconExternalLink />
    </Button>
  );
};
