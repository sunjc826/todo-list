import React, { Fragment } from "react";
import { ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import UserList from "../users/UserList";

interface AppProps {
  toggleModal: () => void;
}

const ShareModal = ({ toggleModal }: AppProps) => {
  return (
    <Fragment>
      <ModalHeader toggle={toggleModal}>
        Share Project With Yo Homies
      </ModalHeader>
      <ModalBody>
        <UserList interactive />
      </ModalBody>

      <ModalFooter>
        <Button color="danger" onClick={toggleModal}>
          Close
        </Button>
      </ModalFooter>
    </Fragment>
  );
};

export default ShareModal;
