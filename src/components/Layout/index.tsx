import Head from 'next/head';
import UniversalNav from '../UniversalNav/index';
import SecondaryNav from '../SecondaryNav/index';
import Footer from '../Footer/index';
import { LayoutStyle } from './styles';
import { Container } from '../Container';
import { useRouter } from 'next/router';
import { GlobalNav, NavMenuItem } from '../GlobalNav/GlobalNav';
import { NAV_LINKS } from '../../utils/globalnav';

export default function Layout({
  children,
  meta,
  filterKey,
  filterMetadataByOption
}: {
  children: any;
  meta?: any;
  filterKey?: string;
  filterMetadataByOption?: any;
}) {
  const router = useRouter();
  if (!router.isReady) return <></>;

  const filterMetadata = filterKey
    ? filterMetadataByOption[filterKey].label
    : '';

  const title = !meta
    ? ''
    : [meta.chapterTitle, meta.title, filterMetadata, 'AWS Amplify Docs']
        .filter((s) => s !== '')
        .join(' - ');

  const description = !meta
    ? ''
    : [meta.description, filterMetadata, 'AWS Amplify Docs']
        .filter((s) => s !== '')
        .join(' - ');

  return (
    <>
      {meta && (
        <Head>
          <title>{`${title}`}</title>
          <meta property="og:title" content={title} key="og:title" />
          <meta name="description" content={description} />
          <meta
            property="og:description"
            content={description}
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
            content={description}
            key="description"
          />
          <meta property="twitter:card" content="summary" key="twitter:card" />
          <meta property="twitter:title" content={title} key="twitter:title" />
          <meta
            property="twitter:description"
            content={description}
            key="twitter:description"
          />
          <meta
            property="twitter:image"
            content="https://docs.amplify.aws/assets/ogp.jpg"
            key="twitter:image"
          />
        </Head>
      )}
      <GlobalNav links={NAV_LINKS as NavMenuItem[]} currentSite={'Docs'} />
      <SecondaryNav />
      <Container backgroundColor="bg-color-tertiary">
        <LayoutStyle>{children}</LayoutStyle>
      </Container>
      <Footer />
    </>
  );
}
