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
import { BootstrapColor } from "../../../redux/shared";

const bootstrapColors: Array<BootstrapColor> = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
];

interface AppProps {
  modalOpen: boolean;
  toggleModal: () => void;
}

const NewLabel = ({ modalOpen, toggleModal }: AppProps) => {
  const defaultFormState: {
    description: string;
    color: BootstrapColor;
  } = {
    description: "",
    color: "primary",
  };

  const [formState, setFormState] = useState(defaultFormState);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
  const { toggleAlert } = useContext(AlertContext)!;
  const handleSubmit = (e: React.MouseEvent) => {
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

  const handleCancel = (e: React.MouseEvent) => {
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
