import { Heading, Text, Flex } from '@aws-amplify/ui-react';

const meta = {
  title: 'Amplify Documentation',
  description:
    'AWS Amplify Docs - Develop and deploy cloud-powered web and mobile apps.',
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
  return (
    <Flex className="home-content">
      <Heading level={1} className="home-intro__heading">
        Amplify Documentation
      </Heading>
      <Text className="home-intro__text">
        This is where the new docs will go
      </Text>
    </Flex>
  );
}
