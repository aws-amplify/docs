import { useState, createContext, useRef, RefObject } from 'react';
import { LinkDataType } from './display/TypeLink';
import { ApiModal } from './display/ApiModal';

interface TypeContextInterface {
  setModalData: (data: any) => void;
  setModalTriggerRef: (ref: RefObject<HTMLButtonElement> | null) => void;
  modalTriggerRef: RefObject<HTMLButtonElement> | null;
  openModal: () => void;
  addBreadCrumb: (data: any) => void;
  setBC: (data: any) => void;
}

export const TypeContext = createContext<TypeContextInterface>({
  setModalData: (data) => data,
  setModalTriggerRef: (ref) => ref,
  modalTriggerRef: null,
  openModal: () => {},
  addBreadCrumb: (data) => data,
  setBC: (data) => data
});

export const ApiModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [breadCrumbs, setBreadCrumbs] = useState<LinkDataType[]>([]);
  const [modalTriggerRef, setModalTriggerRef] =
    useState<RefObject<HTMLButtonElement> | null>(null);

  const modalRef = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    setShowModal(true);
    setTimeout(() => {
      // Focus the dialog element after modal is set to open
      modalRef?.current?.focus();
    }, 0);
  };
  const closeModal = () => {
    setShowModal(false);
    // Focus the original modal trigger button after dialog is closed,
    // otherwise, focus will be lost on the page
    setTimeout(() => {
      modalTriggerRef?.current?.focus();
      setModalTriggerRef(null);
    }, 0);
  };

  const addBreadCrumb = (bc) => {
    breadCrumbs.push(bc);
    setBreadCrumbs(breadCrumbs);
  };

  const setBC = (bc) => {
    setBreadCrumbs(bc);
  };

  const clearBC = () => {
    setBreadCrumbs([]);
  };

  const value = {
    setModalData,
    setModalTriggerRef,
    modalTriggerRef,
    openModal,
    addBreadCrumb,
    setBC
  };

  return (
    <TypeContext.Provider value={value}>
      <ApiModal
        modalRef={modalRef}
        data={modalData}
        showModal={showModal}
        close={closeModal}
        breadCrumbs={breadCrumbs}
        clearBC={clearBC}
      />
      {children}
    </TypeContext.Provider>
  );
};
