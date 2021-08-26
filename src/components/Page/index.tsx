import {useRouter} from "next/router";
import {traverseHeadings} from "../../utils/traverseHeadings";
import {gatherAllFilters} from "../../utils/gatherFilters";
import CodeBlockProvider from "../CodeBlockProvider/index";
import Layout from "../Layout/index";
import Menu from "../Menu/index";
import TableOfContents from "../TableOfContents/index";
import NextPrevious from "../NextPrevious/index";
import {ContentStyle, ChapterTitleStyle} from "./styles";
import {
  getChapterDirectory,
  isProductRoot,
} from "../../utils/getLocalDirectory";
import SidebarLayoutToggle from "../SidebarLayoutToggle";
import {useRef, useState} from "react";
import {MQTablet} from "../media";
import {filterMetadataByOption, SelectedFilters} from "../../utils/filter-data";
import ChooseFilterPage from "../../pages/ChooseFilterPage";
import {parseLocalStorage} from "../../utils/parseLocalStorage";
import {withFilterOverrides} from "../../utils/withFilterOverrides";

export default function Page({children, meta}: {children: any; meta?: any}) {
  const router = useRouter();
  if (!router.isReady) {
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    useRef(null);
    return <></>;
  }
  const url = router.asPath;
  const directoryPath = router.pathname;
  let filterKey = "",
    filterKind = "";
  const filterKeysLoaded = parseLocalStorage(
    "filterKeys",
    {} as SelectedFilters,
  );
  const filterKeyUpdates = {} as SelectedFilters;
  if ("platform" in router.query) {
    filterKey = router.query.platform as string;
    filterKeyUpdates.platform = filterKey;
    filterKind = "platform";
  } else if ("integration" in router.query) {
    filterKey = router.query.integration as string;
    filterKeyUpdates.integration = filterKey;
    filterKind = "integration";
  } else if ("framework" in router.query) {
    filterKey = router.query.framework as string;
    filterKeyUpdates.framework = filterKey;
    filterKind = "framework";
  }
  const headers = traverseHeadings(children, filterKey);
  let filters = gatherAllFilters(children, filterKind);
  // special cases
  if (url.startsWith("/guides")) {
    filters = filters.filter((filter) => filter !== "flutter");
  }
  if (url.startsWith("/sdk")) {
    filters = filters.filter(
      (filter) => filter !== "flutter" && filter !== "js",
    );
  }

  const overrides = withFilterOverrides(filterKeyUpdates, filterKeysLoaded);
  const filterKeys = {
    ...filterKeysLoaded,
    ...overrides,
  };

  localStorage.setItem("filterKeys", JSON.stringify(filterKeys));
  if (filters.length !== 0 && !filters.includes(filterKey) && meta) {
    return (
      <ChooseFilterPage
        directoryPath={directoryPath}
        address={url}
        filterKind={filterKind}
        filters={filters}
        currentFilter={filterKey}
        message={`${filterMetadataByOption[filterKey].label} is not supported on this page.  Please select one of the following:`}
      />
    );
  }
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  meta.chapterTitle = "";
  if (meta && !isProductRoot(url)) {
    const {title: chapTitle} = getChapterDirectory(url) as {
      title: string;
    };
    meta.chapterTitle = chapTitle;
  }
  const basePath = "docs.amplify.aws";
  meta.url = basePath + router.pathname;
  if (filterKey !== "") {
    meta.description += ` - ${filterMetadataByOption[filterKey].label}`;
  }

  return (
    <Layout meta={meta}>
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
}) {
  const menuRef = useRef(null);
  // Slice off the "@media " string at the start for use in JS instead of CSS
  const MQTabletJS = MQTablet.substring(6);
  // If the media query matches, then the user is on desktop and should not see the mobile toggle
  const onDesktop =
    typeof window === "undefined"
      ? false
      : window.matchMedia(MQTabletJS).matches;
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
          <ChapterTitleStyle>{chapterTitle}</ChapterTitleStyle>
          <h1>{title}</h1>
          <CodeBlockProvider>
            {children}
            <NextPrevious url={url} filterKey={filterKey} />
          </CodeBlockProvider>
        </div>
      </ContentStyle>
      <TableOfContents title={title}>{headers}</TableOfContents>
      {!onDesktop && (
        <SidebarLayoutToggle menuRef={menuRef}>
          <img className="burger-graphic" src="/assets/burger.svg" />
          <img className="ex-graphic" src="/assets/close.svg" />
        </SidebarLayoutToggle>
      )}
    </>
  );
}
