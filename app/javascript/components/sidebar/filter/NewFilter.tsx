import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Input,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { postFilter } from "../../../redux/actions";
import { AlertContext } from "../../Main";
import TagsLabels from "./TagsLabels";

interface AppProps {
  modalOpen: boolean;
  toggleModal: () => void;
}

const NewFilter = ({ modalOpen, toggleModal }: AppProps) => {
  // https://stackoverflow.com/questions/6982692/how-to-set-input-type-dates-default-value-to-today
  // "en-CA" outputs date in "YYYY-MM_DD" format
  const defaultFormState = {
    filter: {
      description: "",
      startdate: new Date().toLocaleDateString("en-CA"),
      enddate: new Date().toLocaleDateString("en-CA"),
    },
    tag: {},
    label: {},
  };
  const [formState, setFormState] = useState(defaultFormState);

  const handleChange = (type) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const newState = {
      ...formState,
      [type]: {
        ...formState[type],
        [e.target.name]: e.target.value,
      },
    };
    setFormState(newState);
  };

  const dispatch = useDispatch();
  const { toggleAlert } = useContext(AlertContext)!;
  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent
  ) => {
    e.preventDefault();
    dispatch(postFilter(formState))
      .then((res) => {
        toggleAlert({
          message: "Successfully created new filter",
          color: "success",
        });
      })
      .catch((err) => {
        toggleAlert({
          message: "Error:" + err.message,
          color: "danger",
        });
      });
    toggleModal();
  };
  const handleCancel = () => {
    toggleModal();
  };

  return (
    <Modal isOpen={modalOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>New Filter</ModalHeader>
      <ModalBody>
        <Form id="filterForm">
          <FormGroup>
            <Input
              type="text"
              name="description"
              value={formState.filter.description}
              placeholder="Filter Name"
              onChange={handleChange("filter")}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="date"
              name="startdate"
              value={formState.filter.startdate}
              placeholder="Start Date"
              onChange={handleChange("filter")}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="date"
              name="enddate"
              value={formState.filter.enddate}
              placeholder="End Date"
              onChange={handleChange("filter")}
            />
          </FormGroup>
          <TagsLabels
            formState={formState}
            setFormState={setFormState}
            defaultFormState={defaultFormState}
          />
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          form="filterForm"
          type="submit"
          color="primary"
          onClick={handleSubmit}
        >
          Add Filter
        </Button>
        <Button type="button" color="danger" onClick={handleCancel}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NewFilter;
