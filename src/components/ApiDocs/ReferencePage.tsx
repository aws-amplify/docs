import { FunctionReference } from './FunctionReference';
import { Divider, View } from '@aws-amplify/ui-react';
import { API_CATEGORIES, API_SUB_CATEGORIES } from '@/data/api-categories';
import references from '@/directory/apiReferences.json';

export const ReferencePage = ({ category }) => {
  category = API_CATEGORIES[category] || API_SUB_CATEGORIES[category];
  const cat = references['categories'].find(
    (catObject) => catObject.name === category
  );
  return (
    <View className={'reference-page'}>
      {cat?.children?.map((child, idx) => (
        <>
          {idx !== 0 && <Divider marginTop={'medium'} />}
          <FunctionReference func={child} />
        </>
      ))}
    </View>
  );
};
