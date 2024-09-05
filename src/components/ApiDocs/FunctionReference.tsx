import { View } from '@aws-amplify/ui-react';
import { FunctionSignature } from './FunctionSignature';

export const FunctionReference = ({ func, references }) => {
  return (
    <View>
      {func.signatures.map((sig) => (
        <FunctionSignature sig={sig} references={references} key={sig.id} />
      ))}
    </View>
  );
};
