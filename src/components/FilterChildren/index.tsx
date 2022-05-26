import { useRouter } from 'next/router';
import { useLayoutEffect } from 'react';
import { useLastUpdatedDatesContext } from '../LastUpdatedProvider';

export default function FilterChildren({ children, frontmatter }) {
  const router = useRouter();
  
  const lastUpdatedDatesContext = useLastUpdatedDatesContext();

  let filterKey = '';
  if ('platform' in router.query) {
    filterKey = router.query.platform as string;
  } else if ('integration' in router.query) {
    filterKey = router.query.integration as string;
  } else if ('framework' in router.query) {
    filterKey = router.query.framework as string;
  }

  const filteredChildren = children.filter(
    (el) => el.key === filterKey || el.key === 'all'
  );

  useLayoutEffect(() => {
    if (frontmatter && filteredChildren.length > 0) {
      lastUpdatedDatesContext.updateLastUpdatedDate(frontmatter.lastUpdated);
    }
  }, []);

  return filteredChildren;
}
