import { View } from '@aws-amplify/ui-react';
import { MDXHeading } from '../MDXComponents';
import { ApiComment } from './ApiComment';
import { Parameters } from './Parameters';
import { Throws } from './Throws';
import { FunctionReturn } from './FunctionReturn';

export const FunctionSignature = ({ sig, references }) => {
  const sigObject = references[sig];
  const description = sigObject?.comment?.summary;
  const parameters = sigObject?.parameters;
  const throws = sigObject?.comment?.blockTags?.filter(
    (tagObject) => tagObject['tag'] === '@throws'
  );
  const returns = sigObject?.type;
  return (
    <View>
      <MDXHeading level={2}>{sigObject.name}</MDXHeading>

      {description && <ApiComment apiComment={description} />}

      {parameters && (
        <Parameters parameters={parameters} references={references} />
      )}

      {throws && <Throws throws={throws} />}

      {returns && (
        <FunctionReturn functionReturn={returns} references={references} />
      )}
    </View>
  );
};
