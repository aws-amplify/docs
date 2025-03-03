import { Fragment } from 'react';

import { FunctionReference } from './FunctionReference';
import { Divider, View, Flex } from '@aws-amplify/ui-react';
import { packageCategories } from '@/data/api-categories.mjs';
import references from '@/directory/apiReferences/amplify-js.json';
import { MDXHeading } from '../MDXComponents';

const { API_CATEGORIES, API_SUB_CATEGORIES } = packageCategories['amplify-js'];

export const ReferencePage = ({ category }) => {
  category = API_CATEGORIES[category] || API_SUB_CATEGORIES[category];
  const cat = references['categories'].find(
    (catObject) => catObject.name === category
  );
  return (
    <View className={'reference-page'}>
      {cat?.children?.map((child, idx) => (
        <Fragment key={`reference-${idx}`}>
          {idx !== 0 && <Divider marginTop={'medium'} />}
          <FunctionReference func={child} />
        </Fragment>
      ))}
      <Divider marginTop={'large'} marginBottom={'large'} />
      <MDXHeading level={4}>Link Color Legend</MDXHeading>
      <Flex className="api-legend-container">
        <Flex>
          <View as="span" className="api-legend interface" />
          Interface
        </Flex>
        <Flex>
          <View as="span" className="api-legend reference" />
          Reference
        </Flex>
        <Flex>
          <View as="span" className="api-legend union" />
          Other
        </Flex>
      </Flex>
    </View>
  );
};
