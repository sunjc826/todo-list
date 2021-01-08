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
import TagsLabels from "../sidebar/filter/TagsLabels";
import { ThunkDispatch } from "redux-thunk";
import { RootState } from "../../redux/rootReducer";
import { AnyAction } from "redux";
import { Id } from "../../redux/shared";

interface AppProps {
  modalOpen: boolean;
  toggleModal: () => void;
  isEdit: boolean;
  taskId: Id;
}

const QuickNewTask = ({ modalOpen, toggleModal, isEdit, taskId }: AppProps) => {
  const defaultFormState = {
    content: "",
    priority: 3,
    deadline: new Date().toLocaleDateString("en-CA"),
    completed: false,
    tag: {},
    label: {},
  };

  const defaultFormValid = {
    content: false,
    deadline: false,
  };
  const defaultFormTouched = {
    content: false,
    deadline: false,
  };

  const taskData = useSelector((state: RootState) => state.task.data);
  if (isEdit) {
    const taskToEdit = taskData![taskId!];
    defaultFormState.content = taskToEdit.attributes.content;
    defaultFormState.priority = taskToEdit.attributes.priority;
    // defaultFormState.deadline = taskToEdit.attributes.deadline;
  }

  const formValidators: {
    content: Array<Function>;
    deadline: Array<Function>;
  } = {
    content: [required, maxLength(20)],
    deadline: [required],
  };
  const [formState, setFormState] = useState(defaultFormState);
  const [formValid, setFormValid] = useState(defaultFormValid);
  const [formTouched, setFormTouched] = useState(defaultFormTouched);
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
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

  // submission
  const history = useHistory();
  const { toggleAlert } = useContext(AlertContext)!;
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(formState);
    const tagIds = [];
    const labelIds = [];
    for (const key in formState.tag) {
      if (formState.tag[key]) {
        tagIds.push(key);
      }
    }

    for (const key in formState.label) {
      if (formState.label[key]) {
        labelIds.push(key);
      }
    }

    if (isEdit) {
      dispatch(
        editTask(taskId, formState, {
          tagId: null,
          labelId: null,
          tagIds,
          labelIds,
        })
      )
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
          tagIds,
          labelIds,
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
    // setFormState(defaultFormState);
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
          <TagsLabels
            formState={formState}
            setFormState={setFormState}
            defaultFormState={defaultFormState}
          />
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
