import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styled from "styled-components";
import { Id } from "../../../../redux/shared";
import Tabs from "./Tabs";

const SmallHeading = styled.p`
  font-size: 0.8em;
`;

interface AppProps {
  modalOpen: boolean;
  toggleModal: () => void;
  projectTitle: string | null;
  completed: boolean;
  content: string;
  priority: number;
  projectId: Id;
  dateString: string;
}

const TaskModal = ({
  modalOpen,
  toggleModal,
  projectTitle,
  completed,
  content,
  priority,
  projectId,
  dateString,
}: AppProps) => {
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal} scrollable size="lg">
      <ModalHeader toggle={toggleModal}>
        {projectTitle ? <p>{projectTitle}</p> : null}
        <SmallHeading>{content}</SmallHeading>
      </ModalHeader>
      <ModalBody>
        <Tabs />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={toggleModal}>
          Exit
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TaskModal;
