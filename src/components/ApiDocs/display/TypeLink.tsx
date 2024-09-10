import { useContext } from 'react';
import { TypeContext } from '@/components/ApiDocs/ApiModalProvider';
import { View } from '@aws-amplify/ui-react';

export interface LinkDataType {
  name: string;
  kind: number;
  type: string | LinkDataType;
  target: number;
}

export interface TypeLinkInterface {
  linkData: LinkDataType;
  breadCrumbs?: LinkDataType[];
}

export const TypeLink = ({ linkData, breadCrumbs }: TypeLinkInterface) => {
  const { setModalData, modalOpen, addBreadCrumb, setBC } =
    useContext(TypeContext);
  const name = linkData.name;
  const className = `type-link kind-${linkData.kind}`;

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
  } else {
    return (
      <button className={className} onClick={onClickHandler}>
        {name}
      </button>
    );
  }
};
