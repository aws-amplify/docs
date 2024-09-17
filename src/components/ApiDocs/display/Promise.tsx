import { View } from '@aws-amplify/ui-react';
import { ParameterType } from './ParameterType';

export const Promise = ({ typeObject }) => {
  const promiseTypes = typeObject.typeArguments.reduce((acc, val, idx) => {
    if (idx === 0) return [<ParameterType typeData={val} key={val.name} />];
    return [...acc, ', ', <ParameterType typeData={val} key={val.name} />];
  }, []);
  return (
    <>
      <View>Promise&lt;{promiseTypes}&gt;</View>
    </>
  );
};
