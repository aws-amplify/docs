import Head from 'next/head';
import Footer from '@/components/Footer/index';
import { LayoutStyle } from './styles';
import { Container } from '../Container';
import { useRouter } from 'next/router';
import { GlobalNav, NavMenuItem } from '@/components/GlobalNav/GlobalNav';
import { TestNav } from '@/components/TestNav';
import { Flex, View } from '@aws-amplify/ui-react';
import { FRAMEWORK_DISPLAY_NAMES } from '@/data/frameworks';

import {
  LEFT_NAV_LINKS,
  RIGHT_NAV_LINKS,
  SOCIAL_LINKS
} from '../../utils/globalnav';
import { forwardRef, useEffect } from 'react';
import { trackPageVisit } from '../../utils/track';

export const Layout = forwardRef(function Layout(
  {
    children,
    pageTitle,
    pageDescription,
    platform
  }: {
    children: any;
    pageTitle?: string;
    pageDescription?: string;
    platform?: string;
  },
  footerRef
) {
  useEffect(() => {
    trackPageVisit();
  }, []);

  const router = useRouter();
  const basePath = 'docs.amplify.aws';
  const url = basePath + router.asPath;
  if (!router.isReady) return <></>;

  const title = [
    pageTitle,
    platform ? FRAMEWORK_DISPLAY_NAMES[platform] : null,
    'AWS Amplify Docs'
  ]
    .filter((s) => s !== '' && s !== null)
    .join(' - ');

  const description = pageDescription + 'AWS Amplify Docs';

  return (
    <>
      <Head>
        <title>{`${title}`}</title>
        <meta property="og:title" content={title} key="og:title" />
        <meta name="description" content={description} />
        <meta
          property="og:description"
          content={description}
          key="og:description"
        />
        <meta property="og:url" content={url} key="og:url" />
        <meta
          property="og:image"
          content="https://docs.amplify.aws/assets/ogp.jpg"
          key="og:image"
        />
        <meta property="description" content={description} key="description" />
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

      <GlobalNav
        leftLinks={LEFT_NAV_LINKS as NavMenuItem[]}
        rightLinks={RIGHT_NAV_LINKS as NavMenuItem[]}
        socialLinks={SOCIAL_LINKS as NavMenuItem[]}
        currentSite=""
      />

      <Container backgroundColor="bg-color-tertiary">
        <LayoutStyle>
          <Flex width="100%">
            <TestNav />
            <View flex="1 0 auto" padding="xxl" minHeight="100vh">
              <Flex direction="column">{children}</Flex>
            </View>
          </Flex>
        </LayoutStyle>
      </Container>
      <Footer ref={footerRef} />
    </>
  );
});
