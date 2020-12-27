import React, { useState, useContext } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Input,
  Label,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { postLabel } from "../../../redux/actions";
import { AlertContext } from "../../Main";

const bootstrapColors = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
];

const NewLabel = ({ modalOpen, toggleModal }) => {
  const defaultFormState = {
    description: "",
    color: "primary",
  };

  const [formState, setFormState] = useState(defaultFormState);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const colorComponent = bootstrapColors.map((color) => {
    return (
      <Button
        key={color}
        color={color}
        type="button"
        active={formState.color === color}
        onClick={() =>
          setFormState({
            ...formState,
            color: color,
          })
        }
      >
        {color}
      </Button>
    );
  });

  const dispatch = useDispatch();
  const { toggleAlert } = useContext(AlertContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postLabel(formState))
      .then((res) => {
        toggleAlert({ message: "Successful created label", color: "success" });
      })
      .catch((err) => {
        toggleAlert({ message: "Error: " + err.message, color: "danger" });
      });
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
          <FormGroup>
            <Label>Choose a color for your label</Label>
            <ButtonGroup>{colorComponent}</ButtonGroup>
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
