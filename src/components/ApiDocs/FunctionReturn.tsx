import { View } from '@aws-amplify/ui-react';
import { MDXHeading } from '../MDXComponents';

export const FunctionReturn = ({ functionReturn }) => {
    return (
        <View>
            <MDXHeading level={3}>Returns:</MDXHeading>

            {/* {references[fn].return.description} */}
        </View>
    )
}