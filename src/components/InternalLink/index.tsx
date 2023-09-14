import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { PageContext } from '../Page';

export default function InternalLink({ href, platform, children }) {
  const router = useRouter();
  const filterKeys = useContext(PageContext);

  let filterKind = '';
  if (href.startsWith('/cli') || href.startsWith('/console')) {
    filterKind = '';
  } else if (href.startsWith('/lib')) {
    filterKind = 'platform';
  } else if (href.startsWith('/sdk')) {
    filterKind = 'platform';
  } else if (href.startsWith('/ui')) {
    filterKind = 'framework';
  } else if (href.startsWith('/guides')) {
    filterKind = 'platform';
  } else if (href.startsWith('/start')) {
    filterKind = 'integration';
  }

  function createHref(href, filterKind, filterKey) {
    if (href.includes('#')) {
      const hrefParts = href.split('#');
      href = `${hrefParts[0]}/q/${filterKind}/${filterKey}#${hrefParts[1]}`;
    } else {
      href += `/q/${filterKind}/${filterKey}`;
    }
    return href;
  }

  if (filterKind != '') {
    if (!href.includes(`/q/${filterKind}/`)) {
      if (filterKind in filterKeys) {
        const filterKey = filterKeys[filterKind];
        href = createHref(href, filterKind, filterKey);
      } else {
        // The selection isn't in the page context either use the value passed through or default to 'js'
        const filterKey = platform || 'js';
        href = createHref(href, filterKind, filterKey);
      }
    }
  }

  if (href[0] === '#') {
    const prevPath = router.asPath.split('#')[0];
    href = prevPath + href;
  }

  return (
    <Link href={href} passHref legacyBehavior>
      {children}
    </Link>
  );
}
