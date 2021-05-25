import Head from "next/head";
import {useRouter} from "next/router";
import {traverseHeadings} from "../../utils/traverseHeadings";
import TableOfContents from "../TableOfContents/index";
import UniversalNav from "../UniversalNav/index";
import Footer from "../Footer/index";
import {ContentStyle, LayoutStyle} from "./styles";

export default function Layout({meta, children}) {
  const router = useRouter();
  const {platform} = router.query;
  const headers = traverseHeadings(children, platform as string);
  const basePath = "docs.amplify.aws";
  return (
    <>
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
      <UniversalNav
        heading="Amplify Docs"
        brandIcon="/assets/logo-light.svg"
        blend={false}
      />
      <LayoutStyle>
        <ContentStyle>{children}</ContentStyle>
        <TableOfContents title={meta.title}>{headers}</TableOfContents>
      </LayoutStyle>
      <Footer />
      <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2.6.3/dist/cdn/docsearch.min.js"></script>
    </>
  );
}
