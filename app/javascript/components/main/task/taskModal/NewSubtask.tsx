import React, { useState, useContext } from "react";
import { Button, Form, FormGroup, Input } from "reactstrap";
import { useDispatch } from "react-redux";
import { postSubtask } from "../../../../redux/actions";
import { AlertContext } from "../../../Main";
import { Id } from "../../../../redux/shared";

interface AppProps {
  taskId: Id;
  setNewSubtask: (b: boolean) => void;
}

const NewSubtask = ({ taskId, setNewSubtask }: AppProps) => {
  const dispatch = useDispatch();
  const defaultFormState = {
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

  const { toggleAlert } = useContext(AlertContext)!;
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(postSubtask(taskId, formState))
      .then((res) => {
        toggleAlert({
          message: "Successfully created new subtask",
          color: "success",
        });
      })
      .catch((err) => {
        toggleAlert({
          message: "Error: " + err.message,
          color: "danger",
        });
      });
    setNewSubtask(false);
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    setNewSubtask(false);
  };

  return (
    <Form>
      <FormGroup>
        <Input
          type="textarea"
          id="content"
          name="content"
          placeholder="Subtask Description"
          value={formState.content}
          onChange={handleChange}
        />
      </FormGroup>
      <Button type="submit" color="primary" onClick={handleSubmit}>
        Submit
      </Button>
      <Button type="submit" color="danger" onClick={handleCancel}>
        Cancel
      </Button>
    </Form>
  );
};

export default NewSubtask;
