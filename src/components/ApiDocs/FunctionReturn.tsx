import { View } from '@aws-amplify/ui-react';
import { MDXHeading } from '../MDXComponents';
import { Promise } from './display/Promise';
import { ApiComment } from './ApiComment';

export const FunctionReturn = ({ functionReturn, references }) => {
  const name = functionReturn.name;
  let display, description;
  if (name === 'Promise') {
    const returnType = references[functionReturn.typeArguments[0].target];
    display = <Promise typeObject={functionReturn} references={references} />;
    if (returnType?.comment?.summary) {
      description = <ApiComment apiComment={returnType.comment.summary} />;
    }
  } else {
    const returnType = references[functionReturn.target];
    display = name;
    if (returnType?.comment?.summary) {
      description = <ApiComment apiComment={returnType.comment.summary} />;
    }
  }
  return (
    <View>
      <MDXHeading level={3}>Returns:</MDXHeading>

      {display}

      {description}
    </View>
  );
};
