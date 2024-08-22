import { View, Flex } from '@aws-amplify/ui-react'
import { TypeLink } from './TypeLink';
import references from '../../../directory/apiReferences.json';

export const ParameterType = ({ typeData }) => {
    if (!typeData) return;
    const typeArgs = typeData.typeArguments;
    const typeType = typeData.type;
    switch (typeType) {
        case 'reference':
            return <>
                <ReferenceType data={typeData} /> {typeArgs && <>&lt;{typeArgs.map((tArg) => {
                    return <TypeLink key={tArg.name} linkData={tArg} />
                })}&gt;</>}
            </>
        case 'intersection':
            const intersectionArgs = typeData.types;
            return <>
                {intersectionArgs.reduce((acc, item, index) => {
                    const comp = <ParameterType key={index} typeData={item} />;
                    if (index !== 0) {
                        acc.push(' & ');
                    }
                    acc.push(comp);
                    return acc;
                }, [])}
            </>
        case 'reflection':
            const reflectionChildren = typeData.children;
            return <>
                {'{'}
                {/* {reflectionChildren.map((child) => {
                    return <>{child.name}: <ParameterType key={child.name} typeData={child} /></>
                })} */}
                {'}'}
            </>
        default:
            return `${typeType} defaulted`;
    }
}

const ReferenceType = ({ data }) => {
    // should be a link that loads the next type when clicked on
    const referencedObject = references[data.target];
    if (!referencedObject) {
        console.log("EMPTY")
        console.log(data);
    }

    return <TypeLink linkData={referencedObject} />
}

const IntersectionType = ({ data }) => {
    // should iterate over types putting & between and rendering each one
    return (
        <View>
            {data.types.map((t, idx) => {
                return (<View key={idx}><TypeLink linkData={t} /> {idx < data.types.length - 1 && <span>&</span>} </View>)
            })}
        </View>
    )
}

const UnionType = ({ data }) => {
    // should iterate over types putting | between and rendering each one
    return (
        <View>
            {data.elements.map((t, idx) => {
                return (<View key={idx}><TypeLink linkData={t} /> {idx < data.elements.length - 1 && <span>|</span>} </View>)
            })}
        </View>
    )
}

const AliasType = ({ data }) => {
    // should render the type object contained in value
    return (<ParameterType typeData={data.value} />)
}

export const ApplicationType = ({ data }) => {
    // example of application SomeType<AnotherType> it should render the "base" and "typeParameters"
    const params = data.typeParameters.map((param, idx) => {
        if (param.type === 'reference') {
            return <><TypeLink linkData={param} />{idx < data.typeParameters.length - 1 ? ', ' : ''}</>
        } else {
            return <><code>{param.name || param.type}</code>{idx < data.typeParameters.length - 1 ? ', ' : ''}</>
        }
    });
    return (
        <View>
            <TypeLink linkData={data.base} /> &lt; {params} &gt;
        </View>
    )
}

const InterfaceType = ({ data }) => {
    // should render the "properties" as types
    return (
        <View>
            {Object.keys(data.properties).map((key, idx) => {
                return (
                    <Flex key={idx}>
                        {data.properties[key].name}: <ParameterType typeData={data.properties[key]} />
                    </Flex>
                )
            })}
        </View>
    )
}

const IdentifierType = ({ data }) => {
    // should render the "typeObject" as a type if no typeObject exists then this is an end node
    if (!data.typeObject) {
        return <code>{data.name}</code>
    } else {
        return <ParameterType typeData={data.typeObject} />
    }
}

const StringType = ({ }) => {
    return (<code>string</code>)
}

const PropertyType = ({ data }) => {
    if (data.value.name) {
        return <TypeLink linkData={data.value} />
    } else {
        return (
            <View>
                <ParameterType typeData={data.value} />
            </View>
        )
    }
}
