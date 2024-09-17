import { View } from '@aws-amplify/ui-react';
import { MDXHeading } from '../MDXComponents';
import { Promise } from './display/Promise';
import { ApiComment } from './ApiComment';
import references from '@/directory/apiReferences.json';
import { ParameterType } from './display';

export const FunctionReturn = ({ functionReturn, sigName }) => {
  const name = functionReturn.name;
  let display, description;
  if (name === 'Promise') {
    const returnType = references[functionReturn.typeArguments[0].target];
    display = <Promise typeObject={functionReturn} />;
    if (returnType?.comment?.summary) {
      description = <ApiComment apiComment={returnType.comment.summary} />;
    }
  } else {
    const returnType = references[functionReturn.target];
    display = <ParameterType typeData={functionReturn} />;
    if (returnType?.comment?.summary) {
      description = <ApiComment apiComment={returnType.comment.summary} />;
    }
  }
  return (
    <View>
      <MDXHeading level={3} id={`${sigName}-Returns`}>
        Returns
      </MDXHeading>

      <code>{display}</code>

      {description}
    </View>
  );
};
