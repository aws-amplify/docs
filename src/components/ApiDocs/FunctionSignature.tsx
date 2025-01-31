import { View } from '@aws-amplify/ui-react';
import { MDXHeading } from '../MDXComponents';
import { ApiComment } from './ApiComment';
import { Parameters } from './Parameters';
import { Throws } from './Throws';
import { FunctionReturn } from './FunctionReturn';
import references from '@/directory/apiReferences/amplify-js.json';

export const FunctionSignature = ({ sig }) => {
  const sigObject = references[sig];
  const description = sigObject?.comment?.summary;
  const parameters = sigObject?.parameters;
  const throws = sigObject?.comment?.blockTags?.filter(
    (tagObject) => tagObject['tag'] === '@throws'
  );
  const returns = sigObject?.type;
  return (
    <View>
      <MDXHeading level={2} id={`${sigObject.name}-${sigObject.id}`}>
        {sigObject.name}
      </MDXHeading>

      {description && <ApiComment apiComment={description} />}

      {parameters && (
        <Parameters
          parameters={parameters}
          sigName={`${sigObject.name}-${sigObject.id}`}
        />
      )}

      {throws && throws.length > 0 && (
        <Throws throws={throws} sigName={`${sigObject.name}-${sigObject.id}`} />
      )}

      {returns && (
        <FunctionReturn
          functionReturn={returns}
          sigName={`${sigObject.name}-${sigObject.id}`}
        />
      )}
    </View>
  );
};
