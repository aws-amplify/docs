import { View } from '@aws-amplify/ui-react';
import { TypeLink } from './TypeLink';
import { LinkDataType } from './TypeLink';
import React from 'react';

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
}
interface ParameterComponentType {
  typeData: typeDataType;
  references: {
    T: number;
  };
}

export const ParameterType = ({
  typeData,
  references
}: ParameterComponentType) => {
  if (!typeData) return;
  const typeArgs = typeData.typeArguments;
  let typeType = typeData.type;
  if (typeData.kind === 256) {
    typeType = 'declaration';
  }
  switch (typeType) {
    case 'reference':
      return (
        <>
          <ReferenceType data={typeData} references={references} />{' '}
          {typeArgs && (
            <>
              &lt;
              {typeArgs.reduce<(string | React.JSX.Element)[]>(
                (acc, tArg, index) => {
                  if (index === 0)
                    return [<TypeLink key={tArg.name} linkData={tArg} />];
                  return [
                    ...acc,
                    ', ',
                    <TypeLink key={tArg.name} linkData={tArg} />
                  ];
                },
                []
              )}
              &gt;
            </>
          )}
        </>
      );
    case 'intersection':
      const intersectionArgs = typeData.types;
      return (
        <IntersectionType args={intersectionArgs} references={references} />
      );
    case 'reflection':
      const reflectionChildren = typeData?.declaration?.children;
      return (
        <ReflectionType
          reflectionChildren={reflectionChildren}
          references={references}
        />
      );
    case 'declaration':
      return <DeclarationType data={typeData} references={references} />;
    case 'union':
      const unionArgs = typeData.types;
      return <UnionType unionArgs={unionArgs} references={references} />;
    case 'literal':
      return `"${typeData.value}"`;
    case 'intrinsic':
      return typeData.name;
    case 'array':
      return <ArrayType data={typeData.elementType} references={references} />;
    default:
      if (typeof typeType === 'object' && typeType !== null) {
        return <ParameterType typeData={typeType} references={references} />;
      }
      console.log(typeType);
      return '';
  }
};

const ArrayType = ({ data, references }) => {
  return (
    <>
      <ParameterType typeData={data} references={references} />
      []
    </>
  );
};

const ReferenceType = ({ data, references }) => {
  // should be a link that loads the next type when clicked on
  const referencedObject = references[data.target];
  if (!referencedObject) {
    return data?.target?.qualifiedName;
  }

  return <TypeLink linkData={referencedObject} />;
};

const IntersectionType = ({ args, references }) => {
  // should iterate over types putting & between and rendering each one
  return (
    <>
      {args.reduce((acc, item, index) => {
        const comp = (
          <ParameterType key={index} typeData={item} references={references} />
        );
        if (index !== 0) {
          acc.push(' & ');
        }
        acc.push(comp);
        return acc;
      }, [])}
    </>
  );
};

const ReflectionType = ({ reflectionChildren, references }) => {
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
              <ParameterType
                key={child.name}
                typeData={child}
                references={references}
              />
            </View>
          );
        })}
      </View>
      {'}'}
    </>
  );
};

const DeclarationType = ({ data, references }) => {
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
                <ParameterType
                  key={childNode.name}
                  typeData={childNode}
                  references={references}
                />
              </View>
            );
          }
        })}
      </View>
      <View>&#125;</View>
    </View>
  );
};

const UnionType = ({ unionArgs, references }) => {
  // should iterate over types putting | between and rendering each one
  return (
    <>
      {unionArgs.reduce((acc, item, index) => {
        const comp = (
          <ParameterType key={index} typeData={item} references={references} />
        );
        if (index !== 0) {
          acc.push(' | ');
        }
        acc.push(comp);
        return acc;
      }, [])}
    </>
  );
};
