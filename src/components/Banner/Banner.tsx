import { Flex, Message, IconsProvider } from '@aws-amplify/ui-react';
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
      {' '}
      <Message
        className="message-banner"
        colorTheme="info"
        heading="The next generation of backend building with Amplify!"
        alignItems="start"
      >
        <Flex
          direction={{ base: 'column', large: 'row' }}
          justifyContent="space-between"
          alignItems="center"
          alignContent="center"
        >
          Interested in exploring Amplify Infrastructure from Code (Amplify
          IfC)? Visit the documentation for our reimagined experience for web
          developers.
          <View>
            <Button
              as="a"
              href={url}
              variation="primary"
              size="small"
              gap="small"
              className="button-banner"
            >
              Go to Amplify IfC docs{' '}
              <IconChevron
                aria-hidden="true"
                className="icon-rotate-270"
                fontSize=".875em"
              />
            </Button>
          </View>
        </Flex>
      </Message>
    </IconsProvider>
  );
};
