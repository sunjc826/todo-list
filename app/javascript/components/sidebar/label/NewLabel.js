import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { postLabel } from "../../../redux/actions";

const NewLabel = ({ modalOpen, toggleModal }) => {
  const defaultFormState = {
    description: "",
  };

  const [formState, setFormState] = useState(defaultFormState);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postLabel(formState));
    toggleModal();
  };

  const handleCancel = (e) => {
    toggleModal();
  };

  return (
    <Modal isOpen={modalOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>Add Label</ModalHeader>
      <ModalBody>
        <Form id="labelForm">
          <FormGroup>
            <Input
              type="text"
              id="description"
              name="description"
              value={formState.description}
              onChange={handleChange}
              placeholder="Label Name"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          type="submit"
          color="primary"
          form="labelForm"
          onClick={handleSubmit}
        >
          Add Label
        </Button>
        <Button type="button" color="danger" onClick={handleCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NewLabel;
