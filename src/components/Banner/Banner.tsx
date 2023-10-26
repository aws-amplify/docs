import { Flex, Message, IconsProvider, Text } from '@aws-amplify/ui-react';
import { IconStar, IconChevron } from '../Icons';
import { Button, View } from '@aws-amplify/ui-react';

interface BannerProps {
  url: string;
}

export const Banner: React.FC<BannerProps> = ({ url }) => {
  return (
    <IconsProvider
      icons={{
        message: {
          info: <IconStar />
        }
      }}
    >
      <Message className="message-banner" colorTheme="info" alignItems="start">
        <Flex className="message-banner__inner">
          <Flex direction="column" gap="xxs">
            <Text as="span" className="message-banner__heading">
              The next generation of backend building with Amplify!
            </Text>
            <Text className="message-banner__content">
              Interested in exploring Amplify Infrastructure from Code (Amplify
              IfC)? Visit the documentation for our reimagined experience for
              web developers.
            </Text>
          </Flex>

          <Button
            as="a"
            href={url}
            size="small"
            gap="small"
            className="message-banner__button"
          >
            Go to Amplify IfC docs{' '}
            <IconChevron className="icon-rotate-270" fontSize=".875em" />
          </Button>
        </Flex>
      </Message>
    </IconsProvider>
  );
};
