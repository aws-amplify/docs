import Link from 'next/link';
import ExternalLink from '@/components/ExternalLink';
import { useCurrentPlatform } from '@/utils/useCurrentPlatform';
import { usePathWithoutHash } from '@/utils/usePathWithoutHash';

export const MDXLink = ({
  href: hrefFromProps,
  children,
  hash: hashFromProps
}) => {
  let href = hrefFromProps;
  let hash = hashFromProps;
  const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
  const baseURI = usePathWithoutHash();
  const platform = useCurrentPlatform();

  if (href.startsWith('/') && href.includes('#')) {
    hash = href.slice(href.indexOf('#'));
    href = href.slice(0, href.indexOf('#'));
  }

  if (!href.includes('/') && href.startsWith('#')) {
    hash = href;
    href = baseURI.replace(platform, '[platform]');
  }

  return isInternal ? (
    <Link
      href={{
        pathname: decodeURI(href),
        ...(platform && { query: { platform } }),
        hash: hash
      }}
    >
      {children}
    </Link>
  ) : (
    <ExternalLink href={href}>{children}</ExternalLink>
  );
};
