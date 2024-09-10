import { useContext, useRef } from 'react';
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
  const {
    setModalData,
    openModal,
    addBreadCrumb,
    setBC,
    setModalTriggerRef,
    modalTriggerRef
  } = useContext(TypeContext);
  const name = linkData.name;
  const className = `type-link kind-${linkData.kind}`;
  const btnRef = useRef<HTMLButtonElement>(null);

  const onClickHandler = () => {
    /** If the modal trigger button hasn't been set, set it here */
    if (!modalTriggerRef) {
      setModalTriggerRef(btnRef);
    }
    setModalData(linkData);
    if (breadCrumbs) {
      setBC(breadCrumbs);
    } else {
      addBreadCrumb(linkData);
    }
    openModal();
  };
  if (
    linkData.type === 'intrinsic' ||
    (linkData.type === 'reference' && typeof linkData.target !== 'number')
  ) {
    return <View as="span">{linkData.name}</View>;
  } else {
    return (
      <button className={className} ref={btnRef} onClick={onClickHandler}>
        {name}
      </button>
    );
  }
};
