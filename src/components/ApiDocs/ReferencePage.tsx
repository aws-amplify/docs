import references from '../../directory/apiReferences.json';
import { FunctionReference } from './FunctionReference';

export const ReferencePage = ({ category }) => {

    const cat = references['categories'].find((catObject) => catObject.name === category);
    return <>
        {cat.children.map((child) => <FunctionReference func={child} />)}
    </>;
}