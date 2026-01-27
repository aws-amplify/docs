import { View } from '@aws-amplify/ui-react';
import { FunctionSignature } from './FunctionSignature';

export const FunctionReference = ({ func }) => {
  return (
    <View>
      {func.signatures.map((sig, index) => (
        <FunctionSignature sig={sig} key={`signature-${index}`} />
      ))}
    </View>
  );
};
