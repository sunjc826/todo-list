import React, { useState } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  ButtonGroup,
  ModalFooter,
  Button,
  Input,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { postTask } from "../../redux/actions";
import { useHistory } from "react-router-dom";

const QuickNewTask = ({ modalOpen, toggleModal }) => {
  const defaultFormState = {
    content: "",
    priority: 3,
    deadline: "",
    completed: false,
  };
  const [formState, setFormState] = useState(defaultFormState);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const priorityButtons = [1, 2, 3, 4, 5].map((ele) => {
    return (
      <Button
        key={ele}
        color="primary"
        onClick={() => setFormState({ ...formState, priority: ele })}
        active={formState.priority === ele}
      >
        {ele}
      </Button>
    );
  });

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postTask(formState, { tagId: null, labelId: null }));
    toggleModal();
    history.push("/tasks");
  };

  return (
    <Modal isOpen={modalOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>
        <p>Quick Add Task</p>
      </ModalHeader>
      <ModalBody>
        <Form id="task-form" onSubmit={handleSubmit}>
          <FormGroup>
            <Input
              type="textarea"
              id="content"
              name="content"
              placeholder="Task Name"
              value={formState.content}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="date"
              id="deadline"
              name="deadline"
              value={formState.deadline}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <ButtonGroup>{priorityButtons}</ButtonGroup>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          form="task-form"
          type="submit"
          color="primary"
          onClick={handleSubmit}
        >
          Add Task
        </Button>
        <Button type="button" color="danger" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default QuickNewTask;
