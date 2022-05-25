import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useLastUpdatedDatesContext } from '../LastUpdatedProvider';

export default function FilterChildren({ children, frontmatter }) {
  const router = useRouter();
  
  const lastUpdatedDatesContext = useLastUpdatedDatesContext();

  useEffect(() => {
    lastUpdatedDatesContext.updateLastUpdatedDate(frontmatter.lastUpdated);
  }, []);

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

  if (filteredChildren.length > 0) {
    return (
      <div>{filteredChildren}</div>
    );
  }

  return filteredChildren;
}
