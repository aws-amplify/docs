import { View } from '@aws-amplify/ui-react';
import { ParameterType } from './ParameterType';

export const Promise = ({ typeObject, references }) => {
  console.log(typeObject);
  const promiseTypes = typeObject.typeArguments.reduce((acc, val, idx) => {
    if (idx === 0)
      return [
        <ParameterType typeData={val} key={val.name} references={references} />
      ];
    return [
      ...acc,
      ', ',
      <ParameterType typeData={val} key={val.name} references={references} />
    ];
  }, []);
  return (
    <>
      <View>Promise&lt;{promiseTypes}&gt;</View>
    </>
  );
};
