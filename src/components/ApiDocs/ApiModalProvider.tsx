import { useState, createContext } from 'react';
import { LinkDataType } from './display/TypeLink';
import { ApiModal } from './display/ApiModal';

export const TypeContext = createContext({
  setModalData: (data) => data,
  modalOpen: () => {},
  addBreadCrumb: (data) => data,
  setBC: (data) => data
});

export const ApiModalProvider = ({ children }) => {
  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [breadCrumbs, setBreadCrumbs] = useState<LinkDataType[]>([]);

  const modalOpen = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
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
    modalOpen,
    addBreadCrumb,
    setBC
  };

  return (
    <TypeContext.Provider value={value}>
      <ApiModal
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
