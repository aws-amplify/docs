import React, { useEffect } from 'react';
import { Flex, View } from '@aws-amplify/ui-react';

import Head from 'next/head';

import { Container } from '@/components/Container';
import TestNav from '@/components/TestNav';
import Footer from '@/components/Footer';

import { trackPageVisit } from '@/utils/track';
import { NavMenuItem, GlobalNav } from '../components/GlobalNav';
import {
  LEFT_NAV_LINKS,
  RIGHT_NAV_LINKS,
  SOCIAL_LINKS
} from '../utils/globalnav';

const meta = {
  title: 'Amplify Docs',
  description:
    'Amplify documentation - Learn how to use Amplify to develop and deploy cloud-powered mobile and web apps.',
  url: 'https://docs.amplify.aws/'
};

const Page = () => {
  useEffect(() => {
    trackPageVisit();
  }, []);

  return (
    <Container backgroundColor="color-off-white">
      <div style={{ minHeight: '600px' }}>Home page</div>
    </Container>
  );
};

export default Page;

Page.getLayout = function getLayout(page) {
  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:title" content={meta.title} key="og:title" />
        <meta name="description" content={meta.description} />
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
      <GlobalNav
        leftLinks={LEFT_NAV_LINKS as NavMenuItem[]}
        rightLinks={RIGHT_NAV_LINKS as NavMenuItem[]}
        socialLinks={SOCIAL_LINKS as NavMenuItem[]}
        currentSite={'Docs'}
      />
      This is a home page specific layout.
      <Flex>
        <TestNav />
        <View>{page}</View>
      </Flex>
      <Footer />
    </>
  );
};
