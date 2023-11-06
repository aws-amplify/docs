<<<<<<< HEAD
import { Heading, Text, Flex, Button, Grid } from '@aws-amplify/ui-react';
import { FrameworkGrid } from '@/components/FrameworkGrid';
import { GetStartedPopover } from '@/components/GetStartedPopover';
import { IconChevron } from '@/components/Icons';
import { Banner } from '@/components/Banner';
import { DEFAULT_PLATFORM } from '@/data/platforms';
import PlatformFeatureList from '../components/FeatureLists/PlatformFeatureList';
import LinkCards from '@/components/LinkCards';
import Link from 'next/link';
=======
import { Grid } from 'theme-ui';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import Hero from '../components/Hero';
import LandingHeroCTA from '../components/LandingHeroCTA';
import { Container } from '../components/Container';
import { Card, CardDetail, CardGraphic } from '../components/Card';
import FeaturesGrid from '../components/FeaturesGrid';
import LinkBanner from '../components/LinkBanner';
import Footer from '../components/Footer';
import SecondaryNav from '../components/SecondaryNav';
import { PageContext } from '@/components/Page';
import { parseLocalStorage } from '@/utils/parseLocalStorage';

import { trackPageVisit } from '../utils/track';
import { NavMenuItem, GlobalNav } from '../components/GlobalNav';
import {
  LEFT_NAV_LINKS,
  RIGHT_NAV_LINKS,
  SOCIAL_LINKS
} from '../utils/globalnav';
import React from 'react';
import WhatsNewBanner from '../components/WhatsNewBanner';
>>>>>>> main

const meta = {
  title: 'Amplify Docs',
  description:
    'Amplify documentation - Learn how to use Amplify to develop and deploy cloud-powered mobile and web apps.',
  url: 'https://docs.amplify.aws/'
};

<<<<<<< HEAD
export function getStaticProps() {
  return {
    props: {
      hasTOC: false,
      showLastUpdatedDate: false,
      pageType: 'home',
      meta,
      useCustomTitle: true
    }
  };
}

export default function Page() {
  //Default platform is javascript
  let defaultPlatform = DEFAULT_PLATFORM;

  return (
    <Flex className="home-content">
      <Flex className="home-intro">
        <Banner />
        <Heading level={1} className="home-intro__heading">
          Amplify Docs
        </Heading>
        <Text className="home-intro__text">
          AWS Amplify streamlines full-stack app development. With its
          libraries, CLI, and services, you can easily connect your frontend to
          the cloud for authentication, storage, APIs, and more.
        </Text>
        <Flex className="home-cta">
          <Link
            href={{
              pathname: '/[platform]/how-amplify-works',
              query: { platform: DEFAULT_PLATFORM }
            }}
          >
            <Button variation="primary" size="large" gap="small">
              How Amplify Works
              <IconChevron
                aria-hidden="true"
                className="icon-rotate-270"
                fontSize=".875em"
              />
            </Button>
          </Link>
          <GetStartedPopover />
        </Flex>
      </Flex>
      <Flex direction="column">
        <Heading level={2}>
          Build fullstack apps with your framework of choice
        </Heading>
        <Text>
          AWS Amplify provides libraries for popular web and mobile frameworks,
          like JavaScript, Flutter, Swift, and React. Our guides, APIs, and
          other resources will help you build, connect, and host fullstack apps
          on AWS. Get started by selecting your preferred framework.
        </Text>
        <FrameworkGrid currentKey="javascript" />
      </Flex>
      <PlatformFeatureList platform={defaultPlatform} />
      <LinkCards platform={defaultPlatform} />
    </Flex>
=======
const Page = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [filterKeys, setFilterKeys] = useState({});

  useEffect(() => {
    setFilterKeys(parseLocalStorage('filterKeys', {}));
  }, []);

  useEffect(() => {
    trackPageVisit();

    setIsMounted(true);
  }, []);

  return (
    <PageContext.Provider value={filterKeys}>
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
      {isMounted ? <SecondaryNav /> : <></>}
      <WhatsNewBanner
        href="https://aws.amazon.com/blogs/mobile/announcing-aws-amplifys-graphql-api-cdk-construct-deploy-real-time-graphql-api-and-data-stack-on-aws/"
        content="Amplify GraphQL API now available as CDK construct"
      />
      <Hero>
        <h1 className="font-weight-300">Amplify Documentation</h1>
        <p>
          Learn how to use Amplify to develop and deploy cloud-powered mobile
          and web apps
        </p>
        <LandingHeroCTA />
      </Hero>

      <Container backgroundColor="color-off-white">
        <div className="padding-top-lg padding-bottom-lg padding-horizontal-md">
          <h4 className="text-align-center">
            Discover the end-to-end AWS solution for mobile and front-end web
            developers
          </h4>

          <Grid
            columns={[1, null, null, 4]}
            gap={4}
            sx={{
              marginTop: '2rem'
            }}
          >
            <Card href="/lib/q/platform/js">
              <CardGraphic alt="" src="/assets/lib.png" />
              <CardDetail>
                <h4>Amplify Libraries</h4>
                <p>
                  Connect app to new or existing AWS services (Cognito, S3, and
                  more).
                </p>
              </CardDetail>
            </Card>
            <Card href="/console">
              <CardGraphic alt="" src="/assets/console.png" />
              <CardDetail>
                <h4>Amplify Studio</h4>
                <p>
                  Visual development environment to accelerate fullstack
                  development.
                </p>
              </CardDetail>
            </Card>
            <Card href="/cli">
              <CardGraphic alt="" src="/assets/cli.png" />
              <CardDetail>
                <h4>Amplify CLI</h4>
                <p>Configure an app backend with a guided CLI workflow.</p>
              </CardDetail>
            </Card>
            <Card
              href="https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html"
              external
            >
              <CardGraphic alt="" src="/assets/console.png" />
              <CardDetail>
                <h4>Amplify Hosting</h4>
                <p>Fully managed web hosting with fullstack CI/CD.</p>
              </CardDetail>
            </Card>
          </Grid>
        </div>
      </Container>

      <FeaturesGrid />
      <LinkBanner />
      <Footer />
    </PageContext.Provider>
>>>>>>> main
  );
}
