import { View } from '@aws-amplify/ui-react';
import { MDXHeading, MDXTable } from '../MDXComponents';
import { ApiComment } from './ApiComment';
import references from '../../directory/apiReferences.json';

export const Parameters = ({ parameters }) => {
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
                                {/* <td onClick={modalOpen}><Type typeData={option.value} /></td> */}
                                <td>Type</td>
                                <td>{option?.comment?.summary && <ApiComment apiComment={option.comment.summary} />}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </MDXTable>
        </View>
    );
}