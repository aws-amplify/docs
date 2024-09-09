import { View } from '@aws-amplify/ui-react';
import { MDXHeading } from '../MDXComponents';
import { ApiComment } from './ApiComment';

export const Throws = ({ throws, sigName }) => {
  return (
    <View>
      <MDXHeading level={3} id={`${sigName}-Throws`}>
        Throws
      </MDXHeading>

      <ul>
        {throws.map((error, i) => (
          <li key={i}>
            <ApiComment apiComment={error.content} codeBlock={true} />{' '}
          </li>
        ))}
      </ul>
    </View>
  );
};
