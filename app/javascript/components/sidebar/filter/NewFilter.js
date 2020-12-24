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
import { useSelector, useDispatch } from "react-redux";
import { postFilter } from "../../../redux/actions";

const NewFilter = ({ modalOpen, toggleModal }) => {
  const defaultFormState = {
    filter: {
      description: "",
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
      // alternative way
      // const tempFormState = formState ? formState : defaultFormState;

      //   const tempTagsComponent = [];
      //   const tempLabelsComponent = [];
      //   for (const key in tagData) {
      //     const ele = tagData[key];
      //     tempTagsComponent.push(
      //       <FormGroup check key={key}>
      //         <Label check>
      //           <Input
      //             type="checkbox"
      //             name={key}
      //             checked={
      //               formState.tag ? formState.tag[key] : defaultFormState.tag[key]
      //             }
      //             onChange={handleCheckChange("tag")}
      //           />{" "}
      //           {ele.attributes.description}
      //         </Label>
      //       </FormGroup>
      //     );
      //   }
      //   for (const key in labelData) {
      //     const ele = labelData[key];
      //     tempLabelsComponent.push(
      //       <FormGroup check key={key}>
      //         <Label check>
      //           <Input
      //             type="checkbox"
      //             name={key}
      //             checked={
      //               formState.label
      //                 ? formState.label[key]
      //                 : defaultFormState.label[key]
      //             }
      //             onChange={handleCheckChange("label")}
      //           />{" "}
      //           {ele.attributes.description}
      //         </Label>
      //       </FormGroup>
      //     );
      //   }

      //   setTagsComponent(tempTagsComponent);
      //   setLabelsComponent(tempLabelsComponent);
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
            />{" "}
            {ele.attributes.description}
          </Label>
        </FormGroup>
      );
    }
  }

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postFilter(formState));
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
