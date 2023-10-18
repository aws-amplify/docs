import { useRouter } from 'next/router';
import { traverseHeadings } from '../../utils/traverseHeadings';
import { gatherAllFilters } from '../../utils/gatherFilters';
import Layout from '../Layout/index';
import MetaContent from './metaContent';
import {
  getChapterDirectory,
  isProductRoot
} from '../../utils/getLocalDirectory';
import { useEffect, useRef, useState, createContext } from 'react';
import {
  filterMetadataByOption,
  SelectedFilters
} from '../../utils/filter-data';
import ChooseFilterPage from '../ChooseFilterPage';
import { parseLocalStorage } from '../../utils/parseLocalStorage';
import { withFilterOverrides } from '../../utils/withFilterOverrides';

export type MdxFrontmatterType = {
  lastUpdated: string;
};

export const PageContext = createContext({});

export default function Page({
  children,
  meta,
  frontmatter,
  platform = '',
  filterKind = ''
}: {
  children: any;
  meta?: any;
  frontmatter?: MdxFrontmatterType;
  platform?: string;
  filterKind?: string;
}) {
  const footerRef = useRef(null);
  const router = useRouter();
  const [filterKeysLoaded, setFilterKeysLoaded] = useState({});

  useEffect(() => {
    setFilterKeysLoaded(parseLocalStorage('filterKeys', {} as SelectedFilters));
  }, []);

  let url = router.asPath;
  // remove trailing slash.  this is important on pages like /cli/index.mdx
  // or /console/index.mdx where router.asPath has a trailing slash and
  // router.pathname doesn't.
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }

  const directoryPath = router.pathname;

  let filterKey = platform;
  const filterKeyUpdates = {} as SelectedFilters;
  if (filterKey && filterKind) {
    filterKeyUpdates[filterKind] = filterKey;
  }
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
  const filterKeys = {
    ...filterKeysLoaded,
    ...overrides
  };

  useEffect(() => {
    if (Object.keys(filterKeys).length !== 0) {
      localStorage.setItem('filterKeys', JSON.stringify(filterKeys));
    }
  }, [filterKeys]);

  if (
    filterKey &&
    filters.length !== 0 &&
    !filters.includes(filterKey) &&
    meta
  ) {
    return (
      <ChooseFilterPage
        directoryPath="/ChooseFilterPage"
        address={url}
        filterKind={filterKind}
        filters={filters}
        currentFilter={filterKey}
        message={`${filterMetadataByOption[filterKey]?.label} is not supported on this page.  Please select one of the following:`}
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

  let parentPageLastUpdatedDate;
  if (frontmatter && frontmatter.lastUpdated) {
    parentPageLastUpdatedDate = frontmatter.lastUpdated;
  }

  return (
    <PageContext.Provider value={filterKeys}>
      <Layout
        meta={meta}
        filterKey={filterKey}
        filterMetadataByOption={filterMetadataByOption}
        ref={footerRef}
      >
        {meta ? (
          <MetaContent
            title={meta.title}
            chapterTitle={meta.chapterTitle}
            headers={headers}
            children={children}
            filters={filters}
            filterKey={filterKey}
            filterKind={filterKind}
            url={url}
            directoryPath={directoryPath}
            parentPageLastUpdatedDate={parentPageLastUpdatedDate}
            footerRef={footerRef}
          />
        ) : (
          children
        )}
      </Layout>
    </PageContext.Provider>
  );
}
