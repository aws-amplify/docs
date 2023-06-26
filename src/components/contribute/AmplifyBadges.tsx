import { Heading, View, Text, Flex } from '@aws-amplify/ui-react';
import * as img from '../../constants/img';
export default function AmplifyBadges() {
  return (

    <Flex
    direction="column"
    maxWidth="1024px"
    margin="0 auto"
    gap="2em"
    width={{ base: '90%', large: '60%' }}
  >
    <View>
      <Heading level={2}>The Amplify Badge</Heading>

    </View>
    <Text fontSize="large" color="font.secondary">
      The Amplify Badge Program aims to celebrate the efforts of our contributors by offering them exclusive, eye-catching badges that they can showcase on their online profiles, such as LinkedIn, GitHub, or personal websites.
      </Text>


    <View>

    <Flex
      direction="row"
      justifyContent="center"
      alignItems="top"
      gap="2em"
      wrap={'wrap'}>
        <img
            alt={img.BADGE_FOUNDATIONAL.alt}
            height={200}
            width={200}
            src={img.BADGE_FOUNDATIONAL.src}
          />

<img
            alt={img.BADGE_ITERMEDIATE.alt}
            height={200}
            width={200}
            src={img.BADGE_ITERMEDIATE.src}
          />

<img
            alt={img.BADGE_ADVANCED.alt}
            height={200}
            width={200}
            src={img.BADGE_ADVANCED.src}
          />
        </Flex>

  
    
    </View>
  </Flex>
  );
}
