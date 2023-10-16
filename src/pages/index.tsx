import React, { useEffect } from 'react';
import { Heading, Text, Flex, View, Button } from '@aws-amplify/ui-react';
import { Layout } from '@/components/Layout';
import {
  IconAndroid,
  IconAngular,
  IconFlutter,
  IconJS,
  IconNext,
  IconReact,
  IconSwift,
  IconVue
} from '@/components/Icons';

import { trackPageVisit } from '@/utils/track';

const meta = {
  title: 'Amplify Docs',
  description:
    'Amplify documentation - Learn how to use Amplify to develop and deploy cloud-powered mobile and web apps.',
  url: 'https://docs.amplify.aws/'
};

export default function Page() {
  useEffect(() => {
    trackPageVisit();
  }, []);

  return (
    <Flex className="home-content">
      <Flex className="home-intro">
        <Heading level={1} className="home-intro__heading">
          Amplify Docs
        </Heading>
        <Text className="home-intro__text">
          AWS Amplify streamlines full-stack app development. With its
          libraries, CLI, and services, you can easily connect your frontend to
          the cloud for authentication, storage, APIs, and more.
        </Text>
        <Flex fontSize="3rem">
          <IconAndroid />
          <IconAngular />
          <IconFlutter />
          <IconJS />
          <IconNext />
          <IconReact />
          <IconSwift />
          <IconVue />
        </Flex>
        <Flex>
          <Button variation="primary" size="large">
            How Amplify Works
          </Button>
          <Button>Get Started</Button>
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
      </Flex>
      <Flex direction="column" alignItems="flex-start">
        <Heading level={2}>Features for JavaScript</Heading>
        <Button as="a" href="/">
          View all features
        </Button>
      </Flex>
    </Flex>
  );
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout
      pageTitle={meta.title}
      pageDescription={meta.description}
      url={meta.url}
      pageType="home"
    >
      {page}
    </Layout>
  );
};
