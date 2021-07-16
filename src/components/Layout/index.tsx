import Head from "next/head";
import {useRouter} from "next/router";
import {traverseHeadings} from "../../utils/traverseHeadings";
import {gatherFilters} from "../../utils/gatherFilters";
import CodeBlockProvider from "../CodeBlockProvider/index";
import Menu from "../Menu/index";
import TableOfContents from "../TableOfContents/index";
import UniversalNav from "../UniversalNav/index";
import SecondaryNav from "../SecondaryNav/index";
import NextPrevious from "../NextPrevious/index";
import Footer from "../Footer/index";
import {ContentStyle, LayoutStyle, ChapterTitleStyle} from "./styles";
import {Container} from "../Container";
import Custom404 from "../../pages/404";
import {
  getChapterDirectory,
  isProductRoot,
} from "../../utils/getLocalDirectory";
import SidebarLayoutToggle from "../SidebarLayoutToggle";
import {useRef} from "react";

export default function Layout({children, meta}: {children: any; meta?: any}) {
  const router = useRouter();
  if (!router.isReady) return <></>;
  const {pathname} = router;
  let filterKey = "";
  const filterKeys =
    JSON.parse(localStorage.getItem("filterKeys")) ||
    ({} as {platform?: string; integration?: string; framework?: string});
  if ("platform" in router.query) {
    filterKey = router.query.platform as string;
    filterKeys.platform = filterKey;
  } else if ("integration" in router.query) {
    filterKey = router.query.integration as string;
    filterKeys.integration = filterKey;
  } else {
    filterKey = router.query.framework as string;
    filterKeys.framework = filterKey;
  }
  localStorage.setItem("filterKeys", JSON.stringify(filterKeys));
  const headers = traverseHeadings(children, filterKey);
  const filters = gatherFilters(children);
  if (filters.length !== 0 && !filters.includes(filterKey) && meta) {
    return Custom404();
  }
  let chapterTitle = "";
  if (meta && !isProductRoot(pathname)) {
    const {title: chapTitle} = getChapterDirectory(pathname) as {
      title: string;
    };
    chapterTitle = chapTitle + " - ";
  }
  const basePath = "docs.amplify.aws";
  return (
    <>
      {meta && (
        <Head>
          <title>{`${chapterTitle}${meta.title} - Amplify Docs`}</title>
          <meta property="og:title" content={meta.title} key="og:title" />
          <meta
            property="og:description"
            content={meta.description}
            key="og:description"
          />
          <meta
            property="og:url"
            content={basePath + router.pathname}
            key="og:url"
          />
          <meta
            property="og:image"
            content="https://docs.amplify.aws/assets/ogp.jpg"
            key="og:image"
          />
          <meta
            property="description"
            content={meta.description}
            key="description"
          />
          <meta property="twitter:card" content="summary" key="twitter:card" />
          <meta
            property="twitter:title"
            content={meta.title}
            key="twitter:title"
          />
          <meta
            property="twitter:description"
            content={meta.description}
            key="twitter:description"
          />
          <meta
            property="twitter:image"
            content="https://docs.amplify.aws/assets/ogp.jpg"
            key="twitter:image"
          />
        </Head>
      )}
      <UniversalNav
        heading="Amplify Docs"
        brandIcon="/assets/logo-light.svg"
        blend={false}
      />
      <SecondaryNav filterKey={filterKey} pageHasMenu={false} />
      <Container backgroundColor="bg-color-tertiary">
        <LayoutStyle>
          {meta
            ? metaContent({
                title: meta.title,
                chapterTitle,
                headers,
                children,
                filters,
                filterKey,
                pathname: router.pathname,
                href: router.asPath,
              })
            : children}
        </LayoutStyle>
      </Container>
      <Footer />
      <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2.6.3/dist/cdn/docsearch.min.js"></script>
    </>
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
      <SidebarLayoutToggle menuRef={menuRef}>
        <img className="burger-graphic" src="/assets/burger.svg" />
        <img className="ex-graphic" src="/assets/close.svg" />
      </SidebarLayoutToggle>
    </>
  );
}
