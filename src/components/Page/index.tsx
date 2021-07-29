import {useRouter} from "next/router";
import {traverseHeadings} from "../../utils/traverseHeadings";
import {gatherAllFilters} from "../../utils/gatherFilters";
import CodeBlockProvider from "../CodeBlockProvider/index";
import Layout from "../Layout/index";
import Menu from "../Menu/index";
import TableOfContents from "../TableOfContents/index";
import NextPrevious from "../NextPrevious/index";
import {ContentStyle, ChapterTitleStyle} from "./styles";
import Custom404 from "../../pages/404";
import {
  getChapterDirectory,
  isProductRoot,
} from "../../utils/getLocalDirectory";
import SidebarLayoutToggle from "../SidebarLayoutToggle";
import {useRef} from "react";
import {MQTablet} from "../media";

export default function Page({children, meta}: {children: any; meta?: any}) {
  const router = useRouter();
  if (!router.isReady) return <></>;
  const {pathname} = router;
  let filterKey = "",
    filterKind = "";
  const filterKeys =
    JSON.parse(localStorage.getItem("filterKeys")) ||
    ({} as {platform?: string; integration?: string; framework?: string});
  if ("platform" in router.query) {
    filterKey = router.query.platform as string;
    filterKeys.platform = filterKey;
    filterKind = "platform";
  } else if ("integration" in router.query) {
    filterKey = router.query.integration as string;
    filterKeys.integration = filterKey;
    filterKind = "integration";
  } else {
    filterKey = router.query.framework as string;
    filterKeys.framework = filterKey;
    filterKind = "framework";
  }
  localStorage.setItem("filterKeys", JSON.stringify(filterKeys));
  const headers = traverseHeadings(children, filterKey);
  const filters = gatherAllFilters(children, filterKind);
  if (filters.length !== 0 && !filters.includes(filterKey) && meta) {
    return (
      <Layout>Type-2 404: filter doesn't match our list of filters</Layout>
    );
  }
  meta.chapterTitle = "";
  if (meta && !isProductRoot(pathname)) {
    const {title: chapTitle} = getChapterDirectory(pathname) as {
      title: string;
    };
    meta.chapterTitle = chapTitle + " - ";
  }
  const basePath = "docs.amplify.aws";
  meta.url = basePath + router.pathname;

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
            pathname: router.pathname,
            href: router.asPath,
          })
        : children}
    </Layout>
  );
}

function metaContent({
  title,
  chapterTitle,
  headers,
  children,
  filters,
  filterKey,
  pathname,
  href,
}) {
  const menuRef = useRef(null);
  // Slice off the "@media " string at the start for use in JS instead of CSS
  const MQTabletJS = MQTablet.substring(6);
  // If the media query matches, then the user is on desktop and should not see the mobile toggle
  const onDesktop = window.matchMedia(MQTabletJS).matches;
  return (
    <>
      <Menu
        filters={filters}
        filterKey={filterKey}
        pathname={pathname}
        href={href}
        ref={menuRef}
      ></Menu>
      <ContentStyle>
        <ChapterTitleStyle>{chapterTitle}</ChapterTitleStyle>
        <h1>{title}</h1>
        <CodeBlockProvider>
          {children}
          <NextPrevious pathname={pathname} filterKey={filterKey} />
        </CodeBlockProvider>
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
