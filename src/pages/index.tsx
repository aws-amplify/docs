import { Heading, Text, Flex } from '@aws-amplify/ui-react';
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
        This is where the new docs will go
      </Text>
    </Flex>
  );
}
