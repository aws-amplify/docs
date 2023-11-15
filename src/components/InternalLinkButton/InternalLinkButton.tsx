import Link, { LinkProps } from 'next/link';
import { Button, ButtonProps } from '@aws-amplify/ui-react';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';

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
  const platform = useCurrentPlatform();

  return (
    <Link
      href={{
        pathname: decodeURI(href),
        ...(platform && { query: { platform: useCurrentPlatform() } }),
      }}
>
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
