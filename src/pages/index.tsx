import { useEffect } from 'react';
import { Heading, Text, Flex, Button } from '@aws-amplify/ui-react';
import { debounce } from '@/utils/debounce';
import { Layout } from '@/components/Layout';
import { FrameworkGrid } from '@/components/FrameworkGrid';
import { GetStartedPopover } from '@/components/GetStartedPopover';
import { IconChevron } from '@/components/Icons';
import { Banner } from '@/components/Banner';

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

  const handleScroll = debounce((e) => {
    const bodyScroll = e.target.documentElement.scrollTop;
    if (bodyScroll > 50) {
      document.body.classList.add('scrolled');
    } else if (document.body.classList.contains('scrolled')) {
      document.body.classList.remove('scrolled');
    }
  });

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <Flex className="home-content">
      <Flex className="home-intro">
        <Banner url={'#'} />
        <Heading level={1} className="home-intro__heading">
          Amplify Docs
        </Heading>
        <Text className="home-intro__text">
          AWS Amplify streamlines full-stack app development. With its
          libraries, CLI, and services, you can easily connect your frontend to
          the cloud for authentication, storage, APIs, and more.
        </Text>
        <Flex className="home-intro__cta">
          <Button variation="primary" size="large" gap="small">
            How Amplify Works{' '}
            <IconChevron
              aria-hidden="true"
              className="icon-rotate-270"
              fontSize=".875em"
            />
          </Button>
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
