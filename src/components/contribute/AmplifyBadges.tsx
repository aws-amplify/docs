import { Heading, View, Text, Flex } from '@aws-amplify/ui-react';
import * as img from '../../constants/img';
export default function AmplifyBadges() {
  return (
    <Flex
      direction="row"
      justifyContent="center"
      alignItems="top"
      gap="2em"
      wrap={'wrap'}
    >

    
      <img
            alt={img.BADGE_FOUNDATIONAL.alt}
            height={250}
            width={250}
            src={img.BADGE_FOUNDATIONAL.src}
          />

<img
            alt={img.BADGE_ITERMEDIATE.alt}
            height={250}
            width={250}
            src={img.BADGE_ITERMEDIATE.src}
          />

<img
            alt={img.BADGE_ADVANCED.alt}
            height={250}
            width={250}
            src={img.BADGE_ADVANCED.src}
          />

      
    </Flex>
  );
}
