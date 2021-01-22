import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";

interface AppProps {
  action: string;
  message: string;
  handleConfirm: (e: React.MouseEvent) => void;
  modalOpen: boolean;
  toggleModal: () => void;
}

const ConfirmationModal = ({
  action,
  message,
  handleConfirm,
  modalOpen,
  toggleModal,
}: AppProps) => {
  const handleClick = (e: React.MouseEvent) => {
    toggleModal();
    handleConfirm(e);
  };

  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} centered>
      <ModalHeader toggle={toggleModal}>Confirm {action}</ModalHeader>
      <ModalBody>{message}</ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleClick}>
          Confirm
        </Button>{" "}
        <Button color="danger" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmationModal;
