import { View } from '@aws-amplify/ui-react';
import { MDXHeading } from '../MDXComponents';
import { ApiComment } from './ApiComment';

export const Throws = ({ throws }) => {

    return (
        <View>
            <MDXHeading level={3}>Throws:</MDXHeading>

            <ul>
                {throws.map((error, i) => <li key={i}> <ApiComment apiComment={error.content} /> </li>)}
            </ul>
        </View>)
}