import React, { createContext } from "react";
import { useModal } from "./customHooks";
import { Modal, ModalHeader } from "reactstrap";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const {
    modalOpen,
    toggleModal,
    modalHeader,
    setModalHeader,
    modalContent,
    setModalContent,
  } = useModal();
  return (
    <ModalContext.Provider
      value={{ toggleModal, setModalHeader, setModalContent }}
    >
      <Modal isOpen={modalOpen} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>{modalHeader}</ModalHeader>
        {modalContent}
      </Modal>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
