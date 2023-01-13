import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { traverseHeadings } from '../../utils/traverseHeadings';
import { gatherAllFilters } from '../../utils/gatherFilters';
import Layout from '../Layout/index';
import {
  getChapterDirectory,
  isProductRoot
} from '../../utils/getLocalDirectory';
import {
  filterMetadataByOption,
  SelectedFilters
} from '../../utils/filter-data';
import ChooseFilterPage from '../../pages/ChooseFilterPage';
import { parseLocalStorage } from '../../utils/parseLocalStorage';
import { withFilterOverrides } from '../../utils/withFilterOverrides';
import UIShell from '../UIShell';
import type { PropsWithChildren } from 'react';

export type PageProps = PropsWithChildren<{
  meta?: any;
}>;

export default function Page({ children, meta }: PageProps) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const router = useRouter();
  // @NOTE what does this do?
  // if (!router.isReady) {
  //   // useRef(null);
  //   return <></>;
  // }
  let url = router.asPath;
  // remove trailing slash.  this is important on pages like /cli/index.mdx
  // or /console/index.mdx where router.asPath has a trailing slash and
  // router.pathname doesn't.
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }
  const directoryPath = router.pathname;
  let filterKey = '';
  let filterKind = '';
  const filterKeysLoaded = parseLocalStorage(
    'filterKeys',
    {} as SelectedFilters
  );
  const filterKeyUpdates = {} as SelectedFilters;
  if ('platform' in router.query) {
    filterKey = router.query.platform as string;
    filterKeyUpdates.platform = filterKey;
    filterKind = 'platform';
  } else if ('integration' in router.query) {
    filterKey = router.query.integration as string;
    filterKeyUpdates.integration = filterKey;
    filterKind = 'integration';
  } else if ('framework' in router.query) {
    filterKey = router.query.framework as string;
    filterKeyUpdates.framework = filterKey;
    filterKind = 'framework';
  }
  const headers = traverseHeadings(children, filterKey);
  let filters = gatherAllFilters(children, filterKind);
  // special cases
  if (url.startsWith('/sdk')) {
    filters = filters.filter(
      (filter) => filter !== 'flutter' && filter !== 'js'
    );
  }

  const overrides = withFilterOverrides(filterKeyUpdates, filterKeysLoaded);

  useEffect(() => {
    const filterKeys = {
      ...filterKeysLoaded,
      ...overrides
    };
    localStorage.setItem('filterKeys', JSON.stringify(filterKeys));
    return () => {};
  }, [filterKeysLoaded, overrides]);

  if (filters.length !== 0 && !filters.includes(filterKey) && meta) {
    return (
      <ChooseFilterPage
        directoryPath="/ChooseFilterPage"
        address={url}
        filterKind={filterKind}
        filters={filters}
        currentFilter={filterKey}
        message={`${filterMetadataByOption[filterKey].label} is not supported on this page.  Please select one of the following:`}
      />
    );
  }

  meta.chapterTitle = '';
  if (meta && !isProductRoot(url)) {
    const { title: chapTitle } = getChapterDirectory(url) as {
      title: string;
    };
    meta.chapterTitle = chapTitle;
  }
  const basePath = 'docs.amplify.aws';
  meta.url = basePath + router.asPath;

  return (
    <Layout
      meta={meta}
      filterKey={filterKey}
      filterMetadataByOption={filterMetadataByOption}
    >
      {meta ? (
        <UIShell
          title={meta.title}
          chapterTitle={meta.chapterTitle}
          headers={headers}
          filters={filters}
          filterKey={filterKey}
          filterKind={filterKind}
          url={url}
          directoryPath={directoryPath}
          menuIsOpen={menuIsOpen}
          setMenuIsOpen
        >
          {children}
        </UIShell>
      ) : (
        children
      )}
    </Layout>
  );
}
