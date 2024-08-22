import references from '../../directory/apiReferences.json';
import { FunctionReference } from './FunctionReference';
import { Divider, View } from '@aws-amplify/ui-react';

export const ReferencePage = ({ category }) => {

    const cat = references['categories'].find((catObject) => catObject.name === category);
    return <View className={'reference-page'}>
        {cat.children.map((child, idx) => <>{idx !== 0 && <Divider marginTop={'medium'} />}<FunctionReference func={child} /></>)}
    </View>;
}