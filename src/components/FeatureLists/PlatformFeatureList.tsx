import React from 'react';
import {
  FeatureLists,
  FeatureList,
  FeatureItem
} from '@/components/FeatureLists';

import { Flex } from '@aws-amplify/ui-react';
import featureListData from '@/constants/feature-lists-data';
import { DEFAULT_PLATFORM } from '@/data/platforms';
import type { Platform } from '@/data/platforms';
import { PLATFORM_DISPLAY_NAMES } from '@/data/platforms';
import { useIsGen1Page } from '@/utils/useIsGen1Page';

interface PlatformFeatureListProps {
  platform: Platform | typeof DEFAULT_PLATFORM;
}
const PlatformFeatureList: React.FC<PlatformFeatureListProps> = ({
  platform
}) => {
  const isGen1Page = useIsGen1Page();
  const categories = featureListData[platform].categories;

  return categories.length > 0 ? (
    <Flex direction="column" alignItems="flex-start">
      <FeatureLists title={`Features for ${PLATFORM_DISPLAY_NAMES[platform]}`}>
        {categories.map((category, index) => (
          <FeatureList heading={category.heading} key={index}>
            {category.items.map((categoryItem, index) => (
              <FeatureItem
                linkText={categoryItem.linkText}
                href={
                  categoryItem.isExternal
                    ? categoryItem.link
                    : {
                        pathname: isGen1Page
                          ? `/gen1/[platform]/${categoryItem.link}`
                          : `/[platform]/${categoryItem.link}`,
                        query: {
                          platform: platform
                        }
                      }
                }
                isExternal={categoryItem.isExternal}
                key={index}
              >
                {categoryItem.content}
              </FeatureItem>
            ))}
          </FeatureList>
        ))}
      </FeatureLists>
    </Flex>
  ) : null;
};

export default PlatformFeatureList;
