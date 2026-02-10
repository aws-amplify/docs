import { Heading, Text, Flex } from '@aws-amplify/ui-react';
import { Overview } from '@/components/Overview';
import meta from './meta.json';

export function getStaticProps() {
  return {
    props: {
      hasTOC: true,
      showLastUpdatedDate: false,
      pageType: 'home',
      meta,
      useCustomTitle: true
    }
  };
}

export default function Page() {
  return (
    <Flex className="home-content">
      <Heading level={1} className="home-intro__heading">
        Amplify Documentation
      </Heading>
      <Text className="home-intro__text">
        AWS Amplify is everything you need to build web and mobile apps. Easy to
        start, easy to scale.
        <br />
        <br />
        You can build a fullstack app using Amplify backend building
        capabilities and deploy your web app using managed Amplify Hosting or
        your own CDK Hosting.
      </Text>
      <Heading level={2}>Amplify Frontend Libraries</Heading>
      <Overview
        childPageNodes={[
          {
            route: '/legacy/react/start/quickstart/',
            isExternal: false,
            title: 'Amplify JS',
            description:
              'The frontend library for web and mobile. This is the documentation for it. Click here to get started.',
            platforms: []
          },
          {
            route: 'https://ui.docs.amplify.aws/',
            isExternal: true,
            title: 'Amplify UI',
            description:
              'The UI framework for web and mobile frontend library. It contains basic and complex components for react, angular and more.',
            platforms: []
          }
        ]}
      />
      <Heading level={2}>Amplify Backend Tooling</Heading>
      <Overview
        childPageNodes={[
          {
            route: '/legacy/react/reference/cli-commands/',
            isExternal: false,
            title: 'Amplify CLI',
            description:
              'The CLI provides a simple way to manage your deployed AWS resources. ',
            platforms: []
          },
          {
            route: 'http://localhost:3000/legacy/react/build-a-backend/',
            isExternal: false,
            title: 'Amplify Backend',
            description:
              'Using the provided backend helpers, it is easy to create AWS resources fitting your needs',
            platforms: []
          }
        ]}
      />
      <Heading level={2}>Hosting Amplify Applications</Heading>
      <Overview
        childPageNodes={[
          {
            route:
              'https://docs.aws.amazon.com/amplify/latest/userguide/getting-started.html',
            isExternal: true,
            title: 'Managed Hosting (aka Amplify Hosting)',
            description:
              'Amplify Hosting helps you with quick deployment by providing and opinionated and intuitive setup',
            platforms: []
          },
          {
            route: '/hosting-with-cdk ',
            isExternal: false,
            title: 'Self Hosting',
            description:
              'Self Hosting will give you full control over the resources needed for hosting your Amplify App',
            platforms: []
          }
        ]}
      />
    </Flex>
  );
}
