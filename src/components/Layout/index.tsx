import Head from "next/head";
import {useRouter} from "next/router";
import {createContext, useContext, useState} from "react";
import {traverseHeadings} from "../../utils/traverseHeadings";
import TableOfContents from "../TableOfContents/index";
import UniversalNav from "../UniversalNav/index";
import SecondaryNav from "../SecondaryNav/index";
import Footer from "../Footer/index";
import {ContentStyle, LayoutStyle} from "./styles";

const Context = createContext({
  activeTab: 0,
  setActiveTab: (i) => i,
});

function CodeBlockProvider(children) {
  const [activeTab, setActiveTab] = useState(0);
  const value = {activeTab, setActiveTab};
  return <Context.Provider value={value}>{children.children}</Context.Provider>;
}

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
      <SecondaryNav platform={platform} pageHasMenu={false} />
      <LayoutStyle>
        <ContentStyle>
          <h1>{meta.title}</h1>
          <CodeBlockProvider>{children}</CodeBlockProvider>
        </ContentStyle>
        <TableOfContents title={meta.title}>{headers}</TableOfContents>
      </LayoutStyle>
      <Footer />
      <script src="https://cdn.jsdelivr.net/npm/docsearch.js@2.6.3/dist/cdn/docsearch.min.js"></script>
    </>
  );
}

export function useAppContext() {
  const context = useContext(Context);
  return context;
}
