import React, { useState, useContext } from "react";
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
  FormFeedback,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { postTask, editTask } from "../../redux/actions";
import { useHistory } from "react-router-dom";
import { required, minLength, maxLength } from "../../validators";
import { AlertContext } from "../Main";

const QuickNewTask = ({ modalOpen, toggleModal, isEdit, taskId }) => {
  const defaultFormState = {
    content: "",
    priority: 3,
    deadline: "",
    completed: false,
  };

  const defaultFormValid = {
    content: false,
    deadline: false,
  };
  const defaultFormTouched = {
    content: false,
    deadline: false,
  };

  const taskData = useSelector((state) => state.task.data);
  if (isEdit) {
    const taskToEdit = taskData[taskId];
    defaultFormState.content = taskToEdit.attributes.content;
    defaultFormState.priority = taskToEdit.attributes.priority;
    // defaultFormState.deadline = taskToEdit.attributes.deadline;
  }

  const formValidators = {
    content: [required, maxLength(20)],
    deadline: [required],
  };
  const [formState, setFormState] = useState(defaultFormState);
  const [formValid, setFormValid] = useState(defaultFormValid);
  const [formTouched, setFormTouched] = useState(defaultFormTouched);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    let fieldValid = formValidators[e.target.name].reduce(
      (isValid, validator) => {
        return isValid && validator(e.target.value);
      },
      true
    );
    fieldValid = Boolean(fieldValid);
    setFormValid({
      ...formValid,
      [e.target.name]: fieldValid,
    });
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleBlur = (e) => {
    setFormTouched({
      ...formTouched,
      [e.target.name]: true,
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
  const { toggleAlert } = useContext(AlertContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      dispatch(editTask(taskId, formState))
        .then((res) => {
          toggleAlert({
            message: "Successfully edited task",
            color: "success",
          });
        })
        .catch((err) => {
          toggleAlert({
            message: "Error: " + err.message,
            color: "danger",
          });
        });
      toggleModal();
      reset();
    } else {
      dispatch(
        postTask(formState, {
          tagId: null,
          labelId: null,
          tagIds: [],
          labelIds: [],
        })
      )
        .then((res) => {
          toggleAlert({
            message: "Successfully created task",
            color: "success",
          });
        })
        .catch((err) => {
          toggleAlert({
            message: "Error: " + err.message,
            color: "danger",
          });
        });
      toggleModal();
      reset();
      history.push("/tasks");
    }
  };

  const reset = () => {
    setFormState(defaultFormState);
    setFormTouched(defaultFormTouched);
    setFormValid(defaultFormValid);
  };

  return (
    <Modal isOpen={modalOpen} toggle={toggleModal}>
      <ModalHeader toggle={toggleModal}>
        <p>{isEdit ? "Edit Task" : "Quick Add Task"}</p>
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
              onBlur={handleBlur}
              invalid={formTouched.content && !formValid.content}
            />
            <FormFeedback>
              You've got to have a name for your task!
            </FormFeedback>
          </FormGroup>
          <FormGroup>
            <Input
              type="date"
              id="deadline"
              name="deadline"
              value={formState.deadline}
              onChange={handleChange}
              onBlur={handleBlur}
              invalid={formTouched.deadline && !formValid.deadline}
            />
            <FormFeedback>You must add a deadline for your task!</FormFeedback>
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
          {isEdit ? "Edit" : "Add"} Task
        </Button>
        <Button type="button" color="danger" onClick={toggleModal}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default QuickNewTask;
