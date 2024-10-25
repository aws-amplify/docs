import { Button, ButtonProps } from '@aws-amplify/ui-react';
import { IconExternalLink } from '../Icons';
import { trackExternalLink } from '../../utils/track';
import { useEffect, useRef } from 'react';
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
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      const text = buttonRef.current.innerText;
      setLabel(text ? text : '');
    }
  }, []);

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
      ref={buttonRef}
    >
      {children} <IconExternalLink />
    </Button>
  );
};
