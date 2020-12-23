// This component is loaded when "Add new task" button is clicked
import React, { useState } from "react";
import { ButtonGroup, Form, FormGroup, Input, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { postTask } from "../../../redux/actions";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const NewTask = ({ setNewTask, day }) => {
  const query = useQuery();
  let tagId, labelId;
  if (query.has("tagId")) {
    tagId = query.get("tagId");
  } else if (query.has("labelId")) {
    labelId = query.get("labelId");
  }

  const defaultFormState = {
    content: "",
    priority: 3,
    deadline: day,
    completed: false,
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
    dispatch(postTask(formState, { tagId, labelId }));
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
// t.datetime "deadline"
//     t.string "content"
//     t.integer "priority"
//     t.boolean "completed"
//     t.bigint "user_id", null: false
//     t.bigint "project_id"
