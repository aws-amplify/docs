import { Button, ButtonProps } from '@aws-amplify/ui-react';
import { IconExternalLink } from '../Icons';
import { trackExternalLink } from '../../utils/track';

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
      onClick={() => {
        trackLink(href);
      }}
    >
      {children} <IconExternalLink />
    </Button>
  );
};
