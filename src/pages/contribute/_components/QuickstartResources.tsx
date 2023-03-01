import { Heading, View, Text, Flex } from '@aws-amplify/ui-react';

export default function QuickstartResources() {
  return (
    <Flex
      direction="row"
      justifyContent="center"
      alignItems="top"
      gap="5em"
      wrap={'wrap'}
    >
      <View width={{ base: '90%', large: '60%' }}>
        <Heading level={2}>Quickstart videos</Heading>
        <Text fontSize="large">
          Get your local environment set up quickly by following along with the
          below videos.
        </Text>
      </View>
      <Flex wrap={'wrap'} justifyContent={'center'} width="100%" gap="2em">
        <View width={{ base: '90%', large: '40%' }}>
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
        <View width={{ base: '90%', large: '40%' }}>
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
