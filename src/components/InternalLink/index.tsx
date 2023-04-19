import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseLocalStorage } from '../../utils/parseLocalStorage';

export default function InternalLink({ href, children }) {
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

  if (filterKind != '') {
    if (!href.includes(`/q/${filterKind}/`)) {
      const filterKeys = parseLocalStorage('filterKeys', {});
      if (filterKind in filterKeys) {
        const filterKey = filterKeys[filterKind];
        if (href.includes('#')) {
          const hrefParts = href.split('#');
          href = `${hrefParts[0]}/q/${filterKind}/${filterKey}#${hrefParts[1]}`;
        } else {
          href += `/q/${filterKind}/${filterKey}`;
        }
      }
    }
  }

  if (href[0] === '#') {
    const router = useRouter();
    const prevPath = router.asPath.split('#')[0];
    href = prevPath + href;
  }

  return (
    <Link href={href} passHref legacyBehavior>
      {children}
    </Link>
  );
}
