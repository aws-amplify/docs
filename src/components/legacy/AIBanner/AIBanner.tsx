import { Flex, Message, IconsProvider, Text } from '@aws-amplify/ui-react';
import { IconStar, IconChevron } from '../../Icons';
import { Button } from '@aws-amplify/ui-react';

export const AIBanner: React.FC = () => {
  const URL = '/react/ai/set-up-ai/';
  return (
    <IconsProvider
      icons={{
        message: {
          info: <IconStar />
        }
      }}
    >
      <Message className="message-banner" colorTheme="info">
        <Flex className="message-banner__inner">
          <Flex direction="column" gap="xxs">
            <Text as="span" className="message-banner__heading">
              Amplify AI kit is now generally available
            </Text>
            <Text className="message-banner__content">
              Create fullstack AI-powered apps with TypeScript, no prior
              experience in cloud architecture or AI needed.
            </Text>
          </Flex>

          <Button
            as="a"
            href={URL}
            size="small"
            gap="small"
            colorTheme="overlay"
            rel="noopener noreferrer"
            className="message-banner__button"
          >
            Get started
            <IconChevron className="icon-rotate-270" fontSize=".875em" />
          </Button>
        </Flex>
      </Message>
    </IconsProvider>
  );
};
