import { useRouter } from 'next/router';
import { traverseHeadings } from '../../utils/traverseHeadings';
import { gatherAllFilters } from '../../utils/gatherFilters';
import CodeBlockProvider from '../CodeBlockProvider/index';
import Layout from '../Layout/index';
import Menu from '../Menu/index';
import TableOfContents from '../TableOfContents/index';
import NextPrevious from '../NextPrevious/index';
import { ContentStyle, ChapterTitleStyle, LastUpdatedStyle } from './styles';
import {
  getChapterDirectory,
  isProductRoot
} from '../../utils/getLocalDirectory';
import SidebarLayoutToggle from '../SidebarLayoutToggle';
import { useRef, useState } from 'react';
import { MQTablet } from '../media';
import {
  filterMetadataByOption,
  SelectedFilters
} from '../../utils/filter-data';
import ChooseFilterPage from '../../pages/ChooseFilterPage';
import { parseLocalStorage } from '../../utils/parseLocalStorage';
import { withFilterOverrides } from '../../utils/withFilterOverrides';
import LastUpdatedDatesProvider from '../LastUpdatedProvider';

export default function Page({
  children,
  meta,
  frontmatter
}: {
  children: any;
  meta?: any;
  frontmatter?: any;
}) {
  const router = useRouter();
  if (!router.isReady) {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const [lastUpdatedDate, setLastUpdatedDate] = useState(0);
    const [prevFilterKey, setPrevFilterKey] = useState('');
    useRef(null);
    return <></>;
  }

  let url = router.asPath;
  // remove trailing slash.  this is important on pages like /cli/index.mdx
  // or /console/index.mdx where router.asPath has a trailing slash and
  // router.pathname doesn't.
  if (url.endsWith('/')) {
    url = url.slice(0, -1);
  }

  const directoryPath = router.pathname;
  let filterKey = '',
    filterKind = '';
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
  if (url.startsWith("/sdk")) {
    filters = filters.filter(
      (filter) => filter !== 'flutter' && filter !== 'js'
    );
  }

  const overrides = withFilterOverrides(filterKeyUpdates, filterKeysLoaded);
  const filterKeys = {
    ...filterKeysLoaded,
    ...overrides
  };

  localStorage.setItem('filterKeys', JSON.stringify(filterKeys));
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
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  let pageLastUpdated = 0;
  if (frontmatter && frontmatter.lastUpdated) {
    pageLastUpdated = new Date(frontmatter.lastUpdated).getTime();
  }

  const [prevFilterKey, setPrevFilterKey] = useState('');
  const [lastUpdatedDate, setLastUpdatedDate] = useState(pageLastUpdated);

  if (filterKey !== prevFilterKey) {
    // "Reset" the lastUpdated date when filterKey changes
    setLastUpdatedDate(pageLastUpdated);
    setPrevFilterKey(filterKey);
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
      {meta
        ? metaContent({
            title: meta.title,
            chapterTitle: meta.chapterTitle,
            headers,
            children,
            filters,
            filterKey,
            filterKind,
            url,
            directoryPath,
            menuIsOpen,
            setMenuIsOpen,
            lastUpdatedDate,
            setLastUpdatedDate
          })
        : children}
    </Layout>
  );
}

export function metaContent({
  title,
  chapterTitle,
  headers,
  children,
  filters,
  filterKey,
  filterKind,
  url,
  directoryPath,
  menuIsOpen,
  setMenuIsOpen,
  lastUpdatedDate,
  setLastUpdatedDate
}: {
  title: any;
  chapterTitle: any;
  headers: any;
  children: any;
  filters: any;
  filterKey: any;
  filterKind: any;
  url: any;
  directoryPath: any;
  menuIsOpen: any;
  setMenuIsOpen: any;
  lastUpdatedDate: number;
  setLastUpdatedDate: any;
}) {
  const menuRef = useRef(null);
  // Slice off the "@media " string at the start for use in JS instead of CSS
  const MQTabletJS = MQTablet.substring(6);
  // If the media query matches, then the user is on desktop and should not see the mobile toggle
  const onDesktop =
    typeof window === 'undefined'
      ? false
      : window.matchMedia(MQTabletJS).matches;

  function toReadableDate(date) {
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    return new Date(date).toLocaleDateString('en-US', dateOptions);
  }

  function displayLastUpdatedString(date) {
    if (date) {
      return `Last Updated: ${toReadableDate(lastUpdatedDate)}`;
    }

    return '';
  }

  function updateLastUpdatedDate(date) {
    const dateInTime = new Date(date).getTime();

    const mostRecentDate =
      dateInTime >= lastUpdatedDate
        ? dateInTime
        : lastUpdatedDate;

    setLastUpdatedDate(mostRecentDate);

    console.log('\ndate', new Date(date));
    console.log('lastUpdatedDate', new Date(lastUpdatedDate));
    console.log('mostRecentDate', new Date(mostRecentDate));
  }

  return (
    <>
      <Menu
        filters={filters}
        filterKey={filterKey}
        filterKind={filterKind}
        url={url}
        directoryPath={directoryPath}
        ref={menuRef}
        setMenuIsOpen={setMenuIsOpen}
      ></Menu>
      <ContentStyle menuIsOpen={menuIsOpen}>
        <div>
          <LastUpdatedDatesProvider
            updateLastUpdatedDate={updateLastUpdatedDate}
          >
            <ChapterTitleStyle>{chapterTitle}</ChapterTitleStyle>
            <div>
              <h1>{title}</h1>
              <LastUpdatedStyle>{displayLastUpdatedString(lastUpdatedDate)}</LastUpdatedStyle>
            </div>
            <CodeBlockProvider>
              {children}
              <NextPrevious url={url} filterKey={filterKey} />
            </CodeBlockProvider>
          </LastUpdatedDatesProvider>
        </div>
      </ContentStyle>
      <TableOfContents title={title}>{headers}</TableOfContents>
      {!onDesktop && (
        <SidebarLayoutToggle menuRef={menuRef}>
          <img
            alt="Open menu"
            className="burger-graphic"
            src="/assets/burger.svg"
          />
          <img
            alt="Close menu"
            className="ex-graphic"
            src="/assets/close.svg"
          />
        </SidebarLayoutToggle>
      )}
    </>
  );
}
