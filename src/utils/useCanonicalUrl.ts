import { CANONICAL_URLS } from '@/data/canonical-urls';
import { useRouter } from 'next/router';

export function useCanonicalUrl(meta, canonicalUrlPath, currentPlatform) {
  const router = useRouter();

  // Check to see if it's a generic canonical Url that can be found in our list of canonical Urls.
  canonicalUrlPath = CANONICAL_URLS.includes(canonicalUrlPath)
    ? router.pathname.replace('[platform]', 'javascript')
    : canonicalUrlPath;

  // If it's not found then just use the current platform (this is essentially the current Url)
  canonicalUrlPath = canonicalUrlPath.replace('[platform]', currentPlatform);

  // If we have a custom canoncal Url for a generic platform, then use it
  if (meta?.canonicalUrl) {
    canonicalUrlPath = meta?.canonicalUrl.replace(
      '[platform]',
      currentPlatform
    );
  }

  // If we have specific canonical Url for certain platforms
  if (meta?.canonicalObjects && Array.isArray(meta.canonicalObjects)) {
    meta.canonicalObjects.forEach((canonicalObject) => {
      if (canonicalObject.platforms.includes(currentPlatform)) {
        canonicalUrlPath = canonicalObject.canonicalPath;
      }
    });
  }

  return canonicalUrlPath;
}
