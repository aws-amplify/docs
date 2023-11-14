import Link from 'next/link';
import ExternalLink from '@/components/ExternalLink';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';

export const MDXLink = (props) => {
  let { href, children, hash } = props;
  const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
  const platform = useCurrentPlatform();
  if (href.startsWith('/') && href.includes('#')) {
    hash = href.slice(href.indexOf('#'));
    href = href.slice(0, href.indexOf('#'));
  }

  return isInternal ? (
    <Link
      href={{
        pathname: decodeURI(href),
        ...(platform && { query: { platform: useCurrentPlatform() } }),
        hash: hash
      }}
    >
      {children}
    </Link>
  ) : (
    <ExternalLink href={href}>{children}</ExternalLink>
  );
};
