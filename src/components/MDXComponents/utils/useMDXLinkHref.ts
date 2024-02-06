import { useCurrentPlatform } from '@/utils/useCurrentPlatform';
import { usePathWithoutHash } from '@/utils/usePathWithoutHash';

export function useMDXLinkHref(href, hash) {
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

  const decodedUri = decodeURI(href);

  // Check to see if we need to add the "platform" query param
  // We shouldn't add it, if a specific platform is linked in the baseURI
  const query = decodedUri.includes('[platform]')
    ? { query: { platform } }
    : {};

  return {
    pathname: decodedUri,
    ...(platform && query),
    hash: hash
  };
}
