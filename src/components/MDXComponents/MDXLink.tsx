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

  // For setting up a link when passed only a hash link
  if (!href.includes('/') && href.startsWith('#')) {
    hash = href;
    href = baseURI.replace(platform, '[platform]');
  }

  const decodedURI = decodeURI(href);

  // Check to see if we need to add the "platform" query param
  // We shouldn't add it, if a specific platform is linked in the baseURI
  const query = decodedURI.includes('[platform]')
    ? { query: { platform } }
    : {};

  return isInternal ? (
    <Link
      href={{
        pathname: decodedURI,
        ...(platform && query),
        hash: hash
      }}
    >
      {children}
    </Link>
  ) : (
    <ExternalLink href={href}>{children}</ExternalLink>
  );
};
