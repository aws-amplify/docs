import { Heading, View, Text, Flex } from '@aws-amplify/ui-react';
import { YoutubeEmbed } from '../YoutubeEmbed';

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
          Follow along with these videos to learn how to set up your local
          environment to get started making open source contributions to the
          Amplify project.
        </Text>
      </View>
      <Flex wrap={'wrap'} justifyContent={'center'} width="100%" gap="2em">
        <View width={{ base: '90%', large: '40%' }}>
          <YoutubeEmbed embedId="8BUSqSkhqtw" width="600" height="350" />
        </View>
        <View width={{ base: '90%', large: '40%' }}>
          <YoutubeEmbed embedId="WMKVE98hEzE" width="600" height="350" />
        </View>
      </Flex>
    </Flex>
  );
}
