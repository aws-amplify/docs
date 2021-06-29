import Head from "next/head";
import {useRouter} from "next/router";
import {traverseHeadings} from "../../utils/traverseHeadings";
import {gatherFilters} from "../../utils/gatherFilters";
import CodeBlockProvider from "../CodeBlockProvider/index";
import Menu from "../Menu/index";
import TableOfContents from "../TableOfContents/index";
import UniversalNav from "../UniversalNav/index";
import SecondaryNav from "../SecondaryNav/index";
import Footer from "../Footer/index";
import {ContentStyle, LayoutStyle} from "./styles";
import {Container} from "../Container";
import Custom404 from "../../pages/404";

export default function Layout({children, meta}: {children: any; meta?: any}) {
  const router = useRouter();
  const {pathname} = router;
  const {platform} = router.query as {platform: string};
  const headers = traverseHeadings(children, platform);
  const filters = gatherFilters(children);
  if (!filters.includes(platform) && !pathname.includes("start")) {
    return Custom404();
  }
  const basePath = "docs.amplify.aws";
  return (
    <>
      {meta && (
        <Head>
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
      <SecondaryNav platform={platform} pageHasMenu={false} />
      <Container>
        <LayoutStyle>
          {meta
            ? metaContent({
                title: meta.title,
                headers,
                children,
                filters,
                platform,
                pathname: router.pathname,
              })
            : children}
        </LayoutStyle>
      </Container>
      <Footer />
      <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2.6.3/dist/cdn/docsearch.min.js"></script>
    </>
  );
}

function metaContent({title, headers, children, filters, platform, pathname}) {
  return (
    <>
      <Menu filters={filters} platform={platform} pathname={pathname}></Menu>
      <ContentStyle>
        <h1>{title}</h1>
        <CodeBlockProvider>{children}</CodeBlockProvider>
      </ContentStyle>
      <TableOfContents title={title}>{headers}</TableOfContents>
    </>
  );
}
