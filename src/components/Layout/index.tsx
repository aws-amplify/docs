import Head from 'next/head';
import Footer from '@/components/Footer/index';
import { LayoutStyle } from './styles';
import { Container } from '../Container';
import { useRouter } from 'next/router';
import { GlobalNav, NavMenuItem } from '@/components/GlobalNav/GlobalNav';
import TestNav from '@/components/TestNav';
import { Flex, View } from '@aws-amplify/ui-react';

import {
  LEFT_NAV_LINKS,
  RIGHT_NAV_LINKS,
  SOCIAL_LINKS
} from '../../utils/globalnav';
import { forwardRef, useEffect } from 'react';
import { trackPageVisit } from '../../utils/track';

const Layout = forwardRef(function Layout(
  {
    children,
    meta,
    filterKey,
    filterMetadataByOption
  }: {
    children: any;
    meta?: any;
    filterKey?: string;
    filterMetadataByOption?: any;
  },
  footerRef
) {
  useEffect(() => {
    trackPageVisit();
  }, []);

  const router = useRouter();
  if (!router.isReady) return <></>;

  const filterMetadata = filterKey
    ? filterMetadataByOption[filterKey].label
    : '';

  const title = !meta
    ? ''
    : [meta.chapterTitle, meta.title, filterMetadata, 'AWS Amplify Docs']
        .filter((s) => s !== '' && s !== null && s !== undefined)
        .join(' - ');

  console.log('meta: ', meta);

  const description = !meta
    ? ''
    : [meta.description, filterMetadata, 'AWS Amplify Docs']
        .filter((s) => s !== '')
        .join(' - ');

  const current = meta?.title?.includes('Contribut') ? 'Contribute' : 'Docs';

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
      <GlobalNav
        leftLinks={LEFT_NAV_LINKS as NavMenuItem[]}
        rightLinks={RIGHT_NAV_LINKS as NavMenuItem[]}
        socialLinks={SOCIAL_LINKS as NavMenuItem[]}
        currentSite={current}
      />

      <Container backgroundColor="bg-color-tertiary">
        <LayoutStyle>
          <Flex>
            <TestNav />
            <View>{children}</View>
          </Flex>
        </LayoutStyle>
      </Container>
      <Footer ref={footerRef} />
    </>
  );
});

export default Layout;
