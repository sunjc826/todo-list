import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { postFilter } from "../../../redux/actions";
import { AlertContext } from "../../Main";

const NewFilter = ({ modalOpen, toggleModal }) => {
  const defaultFormState = {
    filter: {
      description: "",
      startdate: "",
      enddate: "",
    },
    tag: {},
    label: {},
  };
  const [formState, setFormState] = useState(defaultFormState);
  const [effectUsed, setEffectUsed] = useState(false);

  const handleChange = (type) => (e) => {
    const newState = {
      ...formState,
      [type]: {
        ...formState[type],
        [e.target.name]: e.target.value,
      },
    };
    setFormState(newState);
  };

  const handleCheckChange = (type) => (e) => {
    const newState = {
      ...formState,
      [type]: {
        ...formState[type],
        [e.target.name]: !formState[type][e.target.name],
      },
    };
    setFormState(newState);
  };

  // Prevents the parent element ListGroup from capturing the event
  // and toggling the Collapse component
  const stopProp = (e) => {
    e.stopPropagation();
  };

  const tagState = useSelector((state) => state.tag);
  const tagLoading = tagState.loading;
  const tagErrMsg = tagState.errMsg;
  const tagData = tagState.data;
  const labelState = useSelector((state) => state.label);
  const labelLoading = labelState.loading;
  const labelErrMsg = labelState.errMsg;
  const labelData = labelState.data;

  let tagsComponent = [];
  let labelsComponent = [];

  useEffect(() => {
    if (tagLoading) {
    } else if (tagErrMsg) {
    } else {
      for (const key in tagData) {
        defaultFormState.tag[key] = false;
      }
      for (const key in labelData) {
        defaultFormState.label[key] = false;
      }
      setFormState(defaultFormState);
    }
    setEffectUsed(true);
    // considering that setState methods are async, does everything in a useEffect
    // always finish execution before the next render?
  }, [labelState]);

  // runs on second render and beyond
  // TODO: Use callbacks to achieve this instead of the effectUsed hack?
  if (effectUsed) {
    // alternative way
    // const tempFormState = formState ? formState : defaultFormState;

    for (const key in tagData) {
      const ele = tagData[key];
      tagsComponent.push(
        <FormGroup check key={key}>
          <Label check>
            <Input
              type="checkbox"
              name={key}
              checked={formState.tag[key]}
              onChange={handleCheckChange("tag")}
              onClick={stopProp}
            />{" "}
            {ele.attributes.description}
          </Label>
        </FormGroup>
      );
    }
    for (const key in labelData) {
      const ele = labelData[key];
      labelsComponent.push(
        <FormGroup check key={key}>
          <Label check>
            <Input
              type="checkbox"
              name={key}
              checked={formState.label[key]}
              onChange={handleCheckChange("label")}
              onClick={stopProp}
            />{" "}
            {ele.attributes.description}
          </Label>
        </FormGroup>
      );
    }
  }

  const dispatch = useDispatch();
  const { toggleAlert } = useContext(AlertContext);
  const handleSubmit = (e) => {
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
          <FormGroup
            tag="fieldset"
            className="border border-dark rounded px-2 pb-1"
          >
            <legend className="mb-0">Tags</legend>
            {tagsComponent}
          </FormGroup>
          <FormGroup
            tag="fieldset"
            className="border border-dark rounded px-2 pb-1"
          >
            <legend className="mb-0">Labels</legend>
            {labelsComponent}
          </FormGroup>
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
