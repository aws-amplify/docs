import { View } from '@aws-amplify/ui-react';

export const Promise = ({ typeObject }) => {
    const promiseTypes = typeObject.typeArguments.reduce((acc, val) => {
        return `${acc}, ${val.name}`;
    }, '').substring(2);
    return (
        <>
            <View>Promise&lt;{promiseTypes}&gt;</View>
        </>
    );
}