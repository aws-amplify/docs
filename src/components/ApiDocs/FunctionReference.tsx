import { View } from '@aws-amplify/ui-react';
import { FunctionSignature } from './FunctionSignature';

export const FunctionReference = ({ func }) => {
    return (<View>
        {func.signatures.map((sig) => <FunctionSignature sig={sig} />)}
    </View>)
}