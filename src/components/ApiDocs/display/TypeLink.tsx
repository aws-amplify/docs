import { useContext } from 'react';
import { TypeContext } from '@/components/Layout/Layout';
import { View } from '@aws-amplify/ui-react';

export interface LinkDataType {
  name: string;
  kind: number;
  type: string | LinkDataType;
}

export interface TypeLinkInterface {
  linkData: LinkDataType;
  breadCrumbs?: [];
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
  if (linkData.type === 'intrinsic') {
    return <View as="span">{linkData.name}</View>;
  } else {
    return (
      <a className={className} onClick={onClickHandler}>
        {name}
      </a>
    );
  }
};
