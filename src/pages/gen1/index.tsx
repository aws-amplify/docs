import { DEFAULT_PLATFORM } from '@/data/platforms';
import { FrameworkGrid } from '@/components/FrameworkGrid';
import { IconChevron } from '@/components/Icons';
import {
  GetStartedPopover,
  generateGetStartedLinks
} from '@/components/GetStartedPopover';
import { InternalLinkButton } from '@/components/InternalLinkButton';
import { Flex, Heading, Text } from '@aws-amplify/ui-react';
import LinkCards from '@/components/LinkCards';
import PlatformFeatureList from '@/components/FeatureLists/PlatformFeatureList';
import {
  gen1GetStartedHref,
  gen1HowAmplifyWorksPathname
} from '@/data/index-page-data';

export const meta = {
  title: 'Amplify Docs (Gen 1)',
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

export function getStaticProps() {
  return {
    props: {
      hasTOC: false,
      showBreadcrumbs: false,
      showLastUpdatedDate: false,
      pageType: 'home',
      meta,
      useCustomTitle: true
    }
  };
}

const PlatformOverview = () => {
  return (
    <Flex className="home-content">
      <Flex className="home-intro">
        <Heading level={1} className="home-intro__heading">
          Amplify Documentation
        </Heading>
        <Text className="home-intro__text">
          AWS Amplify streamlines full-stack app development. With its
          libraries, CLI, and services, you can easily connect your frontend to
          the cloud for authentication, storage, APIs, and more.
        </Text>
        <Flex className="home-cta">
          <GetStartedPopover
            platform={DEFAULT_PLATFORM}
            getStartedLinks={generateGetStartedLinks(gen1GetStartedHref)}
          />
          <InternalLinkButton
            size="large"
            href={{
              pathname: gen1HowAmplifyWorksPathname,
              query: { platform: DEFAULT_PLATFORM }
            }}
          >
            How Amplify Works
            <IconChevron className="icon-rotate-270" fontSize=".875em" />
          </InternalLinkButton>
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
        <FrameworkGrid currentKey={DEFAULT_PLATFORM} />
        <PlatformFeatureList platform={DEFAULT_PLATFORM} />
        <LinkCards platform={DEFAULT_PLATFORM} />
      </Flex>
    </Flex>
  );
};

export default PlatformOverview;
