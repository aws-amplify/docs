import Link, { LinkProps } from 'next/link';
import { Button, ButtonProps } from '@aws-amplify/ui-react';

interface InternalLinkButtonProps extends Omit<LinkProps, 'onClick'> {
  variation?: ButtonProps['variation'];
  size?: ButtonProps['size'];
  children?: React.ReactNode;
  className?: string;
  onClick?: ButtonProps['onClick'];
}

export const InternalLinkButton = ({
  variation,
  size,
  href,
  children,
  className,
  onClick
}: InternalLinkButtonProps) => {
  return (
    <Link href={href} legacyBehavior={true} passHref={true}>
      <Button
        variation={variation}
        gap="small"
        size={size}
        as="a"
        className={className}
        onClick={onClick}
      >
        {children}
      </Button>
    </Link>
  );
};
