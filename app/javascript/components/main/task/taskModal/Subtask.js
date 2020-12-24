import React from "react";
import { ListGroupItem } from "reactstrap";
import { DeleteButton } from "../Task";
import { useDispatch } from "react-redux";
import { deleteSubtask } from "../../../../redux/actions";

const Subtask = ({ content, taskId, subtaskId }) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    dispatch(deleteSubtask(taskId, subtaskId));
    e.stopPropagation();
  };

  return (
    <ListGroupItem action>
      <p>
        <DeleteButton
          className="far fa-times-circle"
          onClick={handleClick}
        ></DeleteButton>
        {" " + content}
      </p>
    </ListGroupItem>
  );
};

export default Subtask;
