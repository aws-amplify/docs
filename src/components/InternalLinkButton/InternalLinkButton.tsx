import Link, { LinkProps } from 'next/link';
import { Button, ButtonProps } from '@aws-amplify/ui-react';

interface InternalLinkButtonProps extends LinkProps {
  variation?: ButtonProps['variation'];
  size?: ButtonProps['size'];
  children?: React.ReactNode;
  className?: string;
}

export const InternalLinkButton = ({
  variation,
  size,
  href,
  children,
  className
}: InternalLinkButtonProps) => {
  return (
    <Link href={href} legacyBehavior={true} passHref={true}>
      <Button
        variation={variation}
        gap="small"
        size={size}
        as="a"
        className={className}
      >
        {children}
      </Button>
    </Link>
  );
};
