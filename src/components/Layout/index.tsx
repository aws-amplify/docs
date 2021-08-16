import Head from "next/head";
import UniversalNav from "../UniversalNav/index";
import SecondaryNav from "../SecondaryNav/index";
import Footer from "../Footer/index";
import {LayoutStyle} from "./styles";
import {Container} from "../Container";
import {useRouter} from "next/router";

export default function Layout({children, meta}: {children: any; meta?: any}) {
  const router = useRouter();
  if (!router.isReady) return <></>;

  const title = !meta
    ? ""
    : [meta.chapterTitle, meta.title, "Amplify Docs"]
        .filter((s) => s !== "")
        .join(" - ");

  return (
    <>
      {meta && (
        <Head>
          <title>{`${title}`}</title>
          <meta property="og:title" content={meta.title} key="og:title" />
          <meta
            property="og:description"
            content={meta.description}
            key="og:description"
          />
          <meta property="og:url" content={meta.url} key="og:url" />
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
      <SecondaryNav />
      <Container backgroundColor="bg-color-tertiary">
        <LayoutStyle>{children}</LayoutStyle>
      </Container>
      <Footer />
      <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2.6.3/dist/cdn/docsearch.min.js"></script>
    </>
  );
}
