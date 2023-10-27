import React from 'react';
import {
  FeatureLists,
  FeatureList,
  FeatureItem
} from '@/components/FeatureLists';

import { Flex, Button } from '@aws-amplify/ui-react';
import featureListData from '../../constants/feature-lists-data';
interface PlatformFeatureListProps {
  platform: string;
}
const PlatformFeatureList: React.FC<PlatformFeatureListProps> = ({
  platform
}) => {
  const categories = featureListData[platform].categories;

  return (
    <Flex direction="column" alignItems="flex-start">
      <Flex direction="column" alignItems="flex-start">
        <FeatureLists platform={platform}>
          {categories.map((category, index) => (
            <React.Fragment key={index}>
              <FeatureList heading={category.heading} level={3}>
                {category.items.map((categoryItem, index) => (
                  <React.Fragment key={index}>
                    <FeatureItem
                      linkText={categoryItem.linkText}
                      href={categoryItem.link}
                      isExternal={true}
                    >
                      {categoryItem.content}
                    </FeatureItem>
                  </React.Fragment>
                ))}
              </FeatureList>
            </React.Fragment>
          ))}
        </FeatureLists>
      </Flex>
      <Button as="a" className="platform-list-feature-button">
        View all features
      </Button>
    </Flex>
  );
};

export default PlatformFeatureList;
