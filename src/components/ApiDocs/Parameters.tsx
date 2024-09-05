import { View } from '@aws-amplify/ui-react';
import { MDXHeading, MDXTable } from '../MDXComponents';
import { ApiComment } from './ApiComment';
import { ParameterType } from './display';

export const Parameters = ({ parameters, references }) => {
  const paramObjects = parameters.map((id) => references[id]);
  return (
    <View>
      <MDXHeading level={3}>Parameters:</MDXHeading>
      <MDXTable>
        <thead>
          <tr>
            <th>Option</th>
            <th>Required</th>
            <th>Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {paramObjects.map((option) => {
            return (
              <tr key={option.id}>
                <td>
                  <code>{option.name}</code>
                </td>
                <td>{option?.flags?.isOptional ? 'false' : 'true'}</td>
                <td>
                  <ParameterType
                    typeData={option.type}
                    references={references}
                  />
                </td>
                <td>
                  {option?.comment?.summary && (
                    <ApiComment apiComment={option.comment.summary} />
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </MDXTable>
    </View>
  );
};
