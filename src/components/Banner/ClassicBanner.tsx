import { Message, Text, Flex, Link } from '@aws-amplify/ui-react';

export const ClassicBanner = () => {
  return (
    <Message
      heading="Welcome to the preview documentation of Amplify's code-first DX (Gen 2)!"
      colorTheme="info"
      className="classic-banner"
    >
      <Flex direction="column" gap="xs">
        <Text>
          Amplify Gen 2 has a new a toolkit that offers an
          infrastructure-from-code (IC) experience, allowing you to focus on
          your business logic instead of configuring cloud infrastructure.
        </Text>
        <Text>
          Looking for the existing Amplify documentation?{' '}
          <Link href="/" isExternal>
            Visit the Amplify tooling-first (Gen 1) Docs
          </Link>
        </Text>
      </Flex>
    </Message>
  );
};
