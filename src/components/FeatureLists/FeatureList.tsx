import React from 'react';
import { Flex, View, Heading } from '@aws-amplify/ui-react';

interface FeatureListProps {
  heading: string;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}
const FeatureList: React.FC<FeatureListProps> = ({
  children,
  heading,
  level
}) => {
  return (
    <Flex direction="column" className="category-list">
      <Heading level={level} className="category-heading-margin">
        {heading}
      </Heading>
      <View as="ul" className="category-list-children">
        {children}
      </View>
    </Flex>
  );
};

export default FeatureList;
