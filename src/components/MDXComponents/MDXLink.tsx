import Link from 'next/link';
import ExternalLink from '@/components/ExternalLink';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';

export const MDXLink = (props) => {
  const { href, children } = props;
  const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
  const platform = useCurrentPlatform();

  return isInternal ? (
    <Link
      href={{
        pathname: decodeURI(href),
        ...(platform && { query: { platform: useCurrentPlatform() } })
      }}
    >
      {children}
    </Link>
  ) : (
    <ExternalLink href={href}>{children}</ExternalLink>
  );
};
