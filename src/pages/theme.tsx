import { View, Flex, Heading, Button } from '@aws-amplify/ui-react';
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

const meta = {
  title: 'Theme',
  description: 'A page to test the theme'
};

export function getStaticProps() {
  return {
    props: {
      meta
    }
  };
}

const Swatch = ({ color }) => {
  return (
    <View
      borderRadius="100%"
      width="2rem"
      height="2rem"
      backgroundColor={color}
    ></View>
  );
};

export default function Page() {
  return (
    <>
      <Heading level={1}>Theme</Heading>
      <Flex>
        <Swatch color="teal.10" />
        <Swatch color="teal.20" />
        <Swatch color="teal.40" />
        <Swatch color="teal.60" />
        <Swatch color="teal.80" />
        <Swatch color="teal.90" />
        <Swatch color="teal.100" />
      </Flex>
      <Flex>
        <Button variation="primary">Primary button</Button>
        <Button>Default button</Button>
      </Flex>
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
    </>
  );
}
