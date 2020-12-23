import React, { useState, useEffect } from "react";
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
import { useSelector } from "react-redux";
import { setLabelData } from "../../../redux/label/labelActions";

const NewFilter = ({ modalOpen, toggleModal }) => {
  const defaultFormState = {
    tag: {},
    label: {},
  };
  const [formState, setFormState] = useState();
  const handleChange = (type) => (e) => ({
    ...formState,
    [type]: {
      [e.target.name]: !formState[type][e.target.name],
    },
  });

  const tagState = useSelector((state) => state.tag);
  const tagLoading = tagState.loading;
  const tagErrMsg = tagState.errMsg;
  const tagData = tagState.data;
  const labelState = useSelector((state) => state.label);
  const labelLoading = labelState.loading;
  const labelErrMsg = labelState.errMsg;
  const labelData = labelState.data;

  let [tagsComponent, setTagsComponent] = useState([]);
  let [labelsComponent, setLabelsComponent] = useState([]);

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
      // alternative way
      // const tempFormState = formState ? formState : defaultFormState;

      const tempTagsComponent = [];
      const tempLabelsComponent = [];
      for (const key in tagData) {
        const ele = tagData[key];
        tempTagsComponent.push(
          <FormGroup check key={key}>
            <Label check>
              <Input
                type="checkbox"
                name={key}
                checked={
                  formState ? formState.tag[key] : defaultFormState.tag[key]
                }
                onChange={handleChange("tag")}
              />{" "}
              {ele.attributes.description}
            </Label>
          </FormGroup>
        );
      }
      for (const key in labelData) {
        const ele = labelData[key];
        tempLabelsComponent.push(
          <FormGroup check key={key}>
            <Label check>
              <Input
                type="checkbox"
                name={key}
                checked={
                  formState ? formState.label[key] : defaultFormState.label[key]
                }
                onChange={handleChange("label")}
              />{" "}
              {ele.attributes.description}
            </Label>
          </FormGroup>
        );
      }

      setTagsComponent(tempTagsComponent);
      setLabelsComponent(tempLabelsComponent);
    }
  }, [labelState]);

  const handleSubmit = (e) => {
    e.preventDefault();
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
            <Input type="text" name="description" />
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
