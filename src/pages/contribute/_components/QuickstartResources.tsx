import { Heading, View, Text, Flex } from '@aws-amplify/ui-react';

export default function QuickstartResources() {
  return (
    <Flex direction="column" gap="2em">
      <View maxWidth="1024px" margin="0 auto">
        <Heading level={2}>Quickstart videos</Heading>
        <Text fontSize="large">
          Get your local environment set up quickly by following along with the
          below videos.
        </Text>
      </View>
      <Flex direction="row">
        <View>
          <iframe
            width="600"
            height="350"
            src="https://www.youtube-nocookie.com/embed/8BUSqSkhqtw"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </View>
        <View>
          <iframe
            width="600"
            height="350"
            src="https://www.youtube-nocookie.com/embed/WMKVE98hEzE"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </View>
      </Flex>
    </Flex>
  );
}
