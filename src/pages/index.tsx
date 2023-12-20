import { Heading, Text, Flex } from '@aws-amplify/ui-react';
import { FrameworkGrid } from '@/components/FrameworkGrid';
import { GetStartedPopover } from '@/components/GetStartedPopover';
import { IconChevron } from '@/components/Icons';
import { DEFAULT_PLATFORM } from '@/data/platforms';
import { InternalLinkButton } from '@/components/InternalLinkButton';
import PlatformFeatureList from '../components/FeatureLists/PlatformFeatureList';
import LinkCards from '@/components/LinkCards';

const meta = {
  title: 'Amplify Documentation',
  description:
    'Amplify documentation - Learn how to use Amplify to develop and deploy cloud-powered mobile and web apps.',
  url: 'https://docs.amplify.aws/'
};

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
  const defaultPlatform = DEFAULT_PLATFORM;

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
          <InternalLinkButton
            variation="primary"
            size="large"
            href={{
              pathname: '/[platform]/how-amplify-works',
              query: { platform: DEFAULT_PLATFORM }
            }}
          >
            How Amplify Works
            <IconChevron
              aria-hidden="true"
              className="icon-rotate-270"
              fontSize=".875em"
            />
          </InternalLinkButton>
          <GetStartedPopover platform={DEFAULT_PLATFORM} />
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
        <FrameworkGrid currentKey={defaultPlatform} />
      </Flex>
      <PlatformFeatureList platform={defaultPlatform} />
      <LinkCards platform={defaultPlatform} />
    </Flex>
  );
}
