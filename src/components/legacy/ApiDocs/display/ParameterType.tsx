import { View } from '@aws-amplify/ui-react';
import { TypeLink } from './TypeLink';
import { LinkDataType } from './TypeLink';
import React from 'react';
import references from '@/directory/apiReferences/amplify-js.json';

interface typeDataType {
  typeArguments?: LinkDataType[];
  type: string | typeDataType;
  kind: number;
  types?: [];
  declaration?: {
    children?: [];
  };
  value?: string;
  name: string;
  elementType?: {
    type: string;
    target: number;
    name: string;
  };
  signatures?: number[];
  targetType?: {
    name: string;
  };
}
interface ParameterComponentType {
  typeData: typeDataType;
}

type TypeArguments = (string | React.JSX.Element)[];

export const ParameterType = ({ typeData }: ParameterComponentType) => {
  if (!typeData) return;
  const typeArgs = typeData.typeArguments;
  let typeType = typeData.type;
  if (typeData.kind === 256) {
    typeType = 'declaration';
  }
  if (typeData.kind === 2048) {
    typeType = 'function';
  }

  // adds type arguments to an array to be rendered
  const addTypeArgs = (
    typeArgs: LinkDataType[],
    displayArray: TypeArguments
  ): TypeArguments => {
    const typeArgArray = typeArgs.reduce<TypeArguments>((acc, tArg, index) => {
      let retValue;
      if (index === 0) {
        retValue = [<TypeLink key={tArg.name} linkData={tArg} />];
      } else {
        retValue = [...acc, ', ', <TypeLink key={tArg.name} linkData={tArg} />];
      }
      if (tArg?.typeArguments?.length) {
        addTypeArgs(tArg.typeArguments, retValue);
      }
      return retValue;
    }, []);
    if (typeArgArray.length) {
      typeArgArray.push('>');
      typeArgArray.unshift('<');
      displayArray.push(...typeArgArray);
    }
    return displayArray;
  };

  switch (typeType) {
    case 'reference':
      return (
        <>
          <ReferenceType data={typeData} />
          {typeArgs && <>{addTypeArgs(typeArgs, [])}</>}
        </>
      );
    case 'intersection':
      const intersectionArgs = typeData.types;
      return <IntersectionType args={intersectionArgs} />;
    case 'reflection':
      const reflectionChildren = typeData?.declaration?.children;
      return <ReflectionType reflectionChildren={reflectionChildren} />;
    case 'declaration':
      return <DeclarationType data={typeData} />;
    case 'union':
      const unionArgs = typeData.types;
      return <UnionType unionArgs={unionArgs} />;
    case 'literal':
      return `"${typeData.value}"`;
    case 'intrinsic':
      return typeData.name;
    case 'predicate':
      return typeData.targetType?.name;
    case 'array':
      return <ArrayType data={typeData.elementType} />;
    case 'function':
      let functionSig;
      if (typeData?.signatures) {
        functionSig = references[typeData.signatures[0]];
      }
      return <FunctionType data={functionSig} />;
    default:
      if (typeof typeType === 'object' && typeType !== null) {
        return <ParameterType typeData={typeType} />;
      }
      return '';
  }
};

const ArrayType = ({ data }) => {
  return (
    <>
      <ParameterType typeData={data} />
      []
    </>
  );
};

const FunctionType = ({ data }) => {
  if (!data) return 'Function';
  const functionTypeArray: (string | React.JSX.Element)[] = ['('];
  if (data.parameters) {
    data.parameters.forEach((paramId, idx) => {
      if (idx !== 0) {
        functionTypeArray.push(', ');
      }
      const param = references[paramId];
      functionTypeArray.push(
        <ParameterType typeData={param} key={param.name} />
      );
    });
  }
  functionTypeArray.push(') => ');
  functionTypeArray.push(
    <ParameterType typeData={data.type} key={data.type.name} />
  );
  return functionTypeArray;
};

const ReferenceType = ({ data }) => {
  // should be a link that loads the next type when clicked on
  const referencedObject = references[data.target];
  if (!referencedObject) {
    return data?.target?.qualifiedName;
  }

  return <TypeLink linkData={referencedObject} />;
};

const IntersectionType = ({ args }) => {
  // should iterate over types putting & between and rendering each one
  return (
    <>
      {args.reduce((acc, item, index) => {
        const comp = <ParameterType key={index} typeData={item} />;
        if (index !== 0) {
          acc.push(' & ');
        }
        acc.push(comp);
        return acc;
      }, [])}
    </>
  );
};

const ReflectionType = ({ reflectionChildren }) => {
  if (!reflectionChildren) {
    return <>{'{}'}</>;
  }
  return (
    <>
      {'{'}
      <View className={'object-type'}>
        {reflectionChildren.map((child) => {
          if (typeof child === 'number') {
            child = references[child];
          }
          return (
            <View key={child.name}>
              {child.name}
              {child?.flags?.isOptional && '?'}:{' '}
              <ParameterType key={child.name} typeData={child} />
            </View>
          );
        })}
      </View>
      {'}'}
    </>
  );
};

const DeclarationType = ({ data }) => {
  return (
    <View>
      <View>&#123;</View>
      <View className={'object-type'}>
        {data?.children?.map((childId) => {
          const childNode = references[childId];
          if (childNode) {
            return (
              <View key={childId}>
                <View as="span">{childNode.name}: </View>
                <ParameterType key={childNode.name} typeData={childNode} />
              </View>
            );
          }
        })}
      </View>
      <View>&#125;</View>
    </View>
  );
};

const UnionType = ({ unionArgs }) => {
  // should iterate over types putting | between and rendering each one
  return (
    <>
      {unionArgs.reduce((acc, item, index) => {
        const comp = <ParameterType key={index} typeData={item} />;
        if (index !== 0) {
          acc.push(' | ');
        }
        acc.push(comp);
        return acc;
      }, [])}
    </>
  );
};
