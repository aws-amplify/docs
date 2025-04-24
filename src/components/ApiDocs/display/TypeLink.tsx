import { useContext } from 'react';
import { TypeContext } from '@/components/ApiDocs/ApiModalProvider';
import { View } from '@aws-amplify/ui-react';
import references from '@/directory/apiReferences/amplify-js.json';

export interface LinkDataType {
  name: string;
  kind: number;
  type: string | LinkDataType;
  target: number | LinkDataType;
  value: string;
  typeArguments: LinkDataType[];
  elementType: LinkDataType;
}

export interface TypeLinkInterface {
  linkData: LinkDataType;
  breadCrumbs?: LinkDataType[];
}

export const TypeLink = ({ linkData, breadCrumbs }: TypeLinkInterface) => {
  const { setModalData, modalOpen, addBreadCrumb, setBC } =
    useContext(TypeContext);
  const name = linkData.name;

  const onClickHandler = () => {
    setModalData(linkData);
    if (breadCrumbs) {
      setBC(breadCrumbs);
    } else {
      addBreadCrumb(linkData);
    }
    modalOpen();
  };
  if (
    linkData.type === 'intrinsic' ||
    (linkData.type === 'reference' && typeof linkData.target !== 'number')
  ) {
    return <View as="span">{linkData.name}</View>;
  } else if (linkData.type === 'literal') {
    return <View as="span">{linkData.value}</View>;
  } else if (
    linkData.type === 'typeOperator' &&
    typeof linkData.target !== 'number'
  ) {
    return <View as="span">{linkData.target.name}</View>;
  } else if (linkData.type === 'array') {
    return [
      <TypeLink
        linkData={linkData.elementType}
        breadCrumbs={breadCrumbs}
        key={linkData.elementType.name}
      />,
      '[]'
    ];
  } else {
    let type = 'unknown';
    if (!linkData.type) {
      type = 'interface';
    } else if (typeof linkData.type === 'string') {
      type = linkData.type;
    } else if (linkData?.type?.type && typeof linkData.type.type === 'string') {
      type = linkData.type.type;
    }
    if (type === 'reference' && typeof linkData.target === 'number') {
      const referencedObject = references[linkData.target];
      type = referencedObject.type?.type
        ? referencedObject.type.type
        : 'interface';
    }
    const className = `type-link type-${type}`;
    return (
      <button className={className} onClick={onClickHandler}>
        {name}
      </button>
    );
  }
};
