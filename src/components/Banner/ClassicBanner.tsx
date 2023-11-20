import { Message, Text, Flex, Link } from '@aws-amplify/ui-react';

export const ClassicBanner = () => {
  return (
    <Message
      heading="Looking for the Amplify tooling-first (Gen 1) docs?"
      colorTheme="info"
      className="classic-banner"
    >
      <Flex direction="column" gap="xs">
        <Text>
          You are currently viewing the preview code-first DX (Gen 2) docs.
          Visit the{' '}
          <Link href="/" isExternal>
            tooling-first (Gen 1) docs
          </Link>{' '}
          .
        </Text>
      </Flex>
    </Message>
  );
};
