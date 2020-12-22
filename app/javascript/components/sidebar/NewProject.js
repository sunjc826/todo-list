import React, { useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { postProject } from "../../redux/actions";
import { useHistory } from "react-router-dom";

const NewProject = ({ modalOpen, toggleModal }) => {
  const defaultFormState = {
    title: "",
    content: "",
    completed: false,
  };

  const [formState, setFormState] = useState(defaultFormState);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Here, instead of relying on a return value (lastCreatedProjectId), is it possible
    // to get the most recent version of the redux store.project's lastCreatedProjectId?
    // When I used useSelector hook, the value of the store is the value prior to dispatching postProject,
    // so lastCreatedProjectId is still null.

    dispatch(postProject(formState)).then((lastCreatedProjectId) => {
      toggleModal();
      history.push(`/project/${lastCreatedProjectId}`);
    });
  };

  return (
    <Modal isOpen={modalOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>New Project</ModalHeader>
      <ModalBody>
        <Form id="project-form">
          <FormGroup>
            <Input
              type="text"
              id="title"
              name="title"
              value={formState.title}
              placeholder="Project Name"
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="textarea"
              id="content"
              name="content"
              value={formState.content}
              placeholder="Project Description"
              onChange={handleChange}
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          form="project-form"
          type="submit"
          onClick={handleSubmit}
          color="primary"
        >
          Add Project
        </Button>
        <Button type="button" onClick={toggleModal} color="danger">
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default NewProject;
