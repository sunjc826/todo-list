// This component is loaded when "Add new task" button is clicked
import React, { useState } from "react";
import { ButtonGroup, Form, FormGroup, Input, Button } from "reactstrap";
import { useDispatch } from "react-redux";
import { postTask } from "../../../redux/actions";

const NewTask = ({ setNewTask, day }) => {
  const dispatch = useDispatch();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postTask(formState));
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
