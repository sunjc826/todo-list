import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styled from "styled-components";
import Tabs from "./Tabs";

const SmallHeading = styled.p`
  font-size: 0.8em;
`;

const TaskModal = ({
  modalOpen,
  toggleModal,
  projectTitle,
  completed,
  content,
  priority,
  projectId,
  dateString,
}) => {
  return (
    <Modal isOpen={modalOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>
        {projectTitle ? <p>{projectTitle}</p> : null}
        <SmallHeading>{content}</SmallHeading>
      </ModalHeader>
      <ModalBody>
        <Tabs />
      </ModalBody>
      <ModalFooter>
        <Button className="btn-primary" onClick={toggleModal}>
          Save and Exit
        </Button>
        <Button className="btn-danger" onClick={toggleModal}>
          Exit
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default TaskModal;
