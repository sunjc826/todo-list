// This component is loaded when "Add new task" button is clicked
import React, { useState } from "react";
import { ButtonGroup, Form, FormGroup, Input, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { postTask } from "../../../redux/actions";
import { useLocation, useParams } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const NewTask = ({ setNewTask, day, project }) => {
  // check whether task has tags or labels
  const query = useQuery();
  let tagId = null;
  let labelId = null;
  let filter_tags_and_labels = { tagIds: [], labelIds: [] };
  const filterState = useSelector((state) => state.filter);
  // const filterLoading = filterState.loading;
  // const filterErrMsg = filterState.errMsg;
  const filterData = filterState.data;

  if (query.has("tagId")) {
    tagId = query.get("tagId");
  } else if (query.has("labelId")) {
    labelId = query.get("labelId");
  } else if (query.has("filterId")) {
    const filterId = query.get("filterId");
    const filterRelations = filterData[filterId].relationships;
    filter_tags_and_labels.tagIds = filterRelations.tags.data.map(
      (tag) => tag.id
    );
    filter_tags_and_labels.labelIds = filterRelations.labels.data.map(
      (label) => label.id
    );
  }

  // check whether task is part of a project
  const params = useParams();
  let projectId = null;
  if (project) {
    projectId = params.projectId;
  }

  const defaultFormState = {
    content: "",
    priority: 3,
    deadline: day,
    completed: false,
    project_id: projectId,
  };
  const [formState, setFormState] = useState(defaultFormState);

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

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      postTask(formState, {
        tagId,
        labelId,
        projectId,
        ...filter_tags_and_labels,
      })
    );
    setNewTask(false);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setNewTask(false);
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
        />
      </FormGroup>
      {project && (
        <FormGroup>
          <Input
            type="date"
            id="deadline"
            name="deadline"
            value={formState.deadline}
            onChange={handleChange}
          />
        </FormGroup>
      )}
      <FormGroup>
        <ButtonGroup>{priorityButtons}</ButtonGroup>
      </FormGroup>

      <Button type="submit" color="primary" onClick={handleSubmit}>
        Add task
      </Button>
      <Button type="submit" color="danger" onClick={handleCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default NewTask;
