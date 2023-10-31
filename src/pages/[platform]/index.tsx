import { getCustomStaticPath } from '@/utils/getCustomStaticPath';
import { PLATFORM_DISPLAY_NAMES } from '@/data/platforms';
import { FrameworkGrid } from '@/components/FrameworkGrid';
import { IconChevron } from '@/components/Icons';
import { GetStartedPopover } from '@/components/GetStartedPopover';
import { Flex, Heading, Button, Text } from '@aws-amplify/ui-react';
import LinkCards from '@/components/LinkCards';
import PlatformFeatureList from '@/components/FeatureLists/PlatformFeatureList';

export const meta = {
  title: 'Overview',
  description: 'This is a description for the overview page.',
  platforms: [
    'android',
    'angular',
    'flutter',
    'javascript',
    'nextjs',
    'react',
    'react-native',
    'swift',
    'vue'
  ]
};

export const getStaticPaths = async () => {
  return getCustomStaticPath(meta.platforms);
};

export function getStaticProps(context) {
  return {
    props: {
      platform: context.params.platform,
      hasTOC: false,
      showLastUpdatedDate: false,
      pageType: 'home',
      meta
    }
  };
}

const PlatformOverview = ({ platform }) => {
  return (
    <Flex className="home-content">
      <Flex className="home-intro">
        <Heading level={1} className="home-intro__heading">
          Amplify Docs for {PLATFORM_DISPLAY_NAMES[platform]}
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
        <FrameworkGrid currentKey={platform} />
        <PlatformFeatureList platform={platform} />
        <LinkCards platform={platform} />
      </Flex>
    </Flex>
  );
};

export default PlatformOverview;
