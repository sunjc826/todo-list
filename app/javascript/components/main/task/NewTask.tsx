// This component is loaded when "Add new task" button is clicked
import React, { useState, useContext } from "react";
import {
  ButtonGroup,
  Form,
  FormGroup,
  Input,
  Button,
  FormFeedback,
  FormText,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { postTask } from "../../../redux/actions";
import { useParams } from "react-router-dom";
import {
  required,
  maxLength,
  ValidatorRecord,
  BoolLike,
} from "../../../validators";
import { useQuery } from "../../../customHooks";
import { AlertContext } from "../../Main";
import { AppDispatch, Id } from "../../../redux/shared";
import { RootState } from "../../../redux/rootReducer";

interface AppProps {
  setNewTask: (b: boolean) => void;
  day?: Date;
  project?: boolean;
}

const NewTask = ({ setNewTask, day, project }: AppProps) => {
  // check whether task has tags or labels
  const query = useQuery();
  let tagId: Id = null;
  let labelId: Id = null;
  let filter_tags_and_labels: {
    tagIds: Array<number | string>;
    labelIds: Array<number | string>;
  } = { tagIds: [], labelIds: [] };
  const filterState = useSelector((state: RootState) => state.filter);
  // const filterLoading = filterState.loading;
  // const filterErrMsg = filterState.errMsg;
  const filterData = filterState.data;

  if (query.has("tagId")) {
    tagId = query.get("tagId");
  } else if (query.has("labelId")) {
    labelId = query.get("labelId");
  } else if (query.has("filterId")) {
    const filterId: Id = query.get("filterId");
    const filterRelations = filterData![filterId!].relationships;
    filter_tags_and_labels.tagIds = filterRelations.tags.data.map(
      (tag) => tag.id
    );
    filter_tags_and_labels.labelIds = filterRelations.labels.data.map(
      (label) => label.id
    );
  }

  // check whether task is part of a project
  const params = useParams<Record<string, string | undefined>>();
  let projectId: Id = null;
  if (project) {
    projectId = params.projectId!;
  }
  let defaultDate = "";
  if (day) {
    defaultDate = day.toLocaleDateString("en-CA");
  }
  const defaultFormState = {
    content: "",
    priority: 3,
    deadline: defaultDate,
    completed: false,
    project_id: projectId,
  };
  const defaultFormValid = {
    content: false,
    deadline: false,
  };
  const defaultFormTouched = {
    content: false,
    deadline: false,
  };
  const formValidators: ValidatorRecord = {
    content: [required, maxLength(20)],
    deadline: [required],
  };
  const [formState, setFormState] = useState(defaultFormState);
  const [formValid, setFormValid] = useState(defaultFormValid);
  const [formTouched, setFormTouched] = useState(defaultFormTouched);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let fieldValid = formValidators[e.target.name].reduce(
      (isValid: BoolLike, validator) => {
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

  const dispatch: AppDispatch = useDispatch();
  const { toggleAlert } = useContext(AlertContext)!;
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(
      postTask(formState, {
        tagId,
        labelId,
        projectId,
        ...filter_tags_and_labels,
      })
    )
      .then((res) => {
        toggleAlert({
          message: "Successfully created new task",
          color: "success",
        });
      })
      .catch((err) => {
        toggleAlert({
          message: "Error: " + err.message,
          color: "danger",
        });
      });
    setNewTask(false);
    reset();
  };

  const handleCancel = (e: React.MouseEvent) => {
    setNewTask(false);
    reset();
  };

  const reset = () => {
    setFormState(defaultFormState);
    setFormTouched(defaultFormTouched);
    setFormValid(defaultFormValid);
  };

  return (
    <Form>
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
        <FormFeedback>You've got to have a name for your task!</FormFeedback>
      </FormGroup>
      {project && (
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
      )}
      <FormGroup>
        <ButtonGroup>{priorityButtons}</ButtonGroup>
        <FormText>How important is this task?</FormText>
      </FormGroup>

      <Button type="submit" color="primary" onClick={handleSubmit}>
        Add task
      </Button>
      <Button type="button" color="danger" onClick={handleCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default NewTask;
