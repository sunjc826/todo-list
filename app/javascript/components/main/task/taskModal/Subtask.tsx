import React from "react";
import { ListGroupItem } from "reactstrap";
import { DeleteButton } from "../Task";
import { useDispatch } from "react-redux";
import { deleteSubtask, postActivity } from "../../../../redux/actions";
import { Id } from "../../../../redux/shared";

interface AppProps {
  content: string;
  taskId: Id;
  subtaskId: Id;
  ownsTask: boolean;
}

const Subtask = ({ content, taskId, subtaskId, ownsTask }: AppProps) => {
  const dispatch = useDispatch();
  const handleClick = (e: React.MouseEvent) => {
    dispatch(deleteSubtask(taskId, subtaskId));
    e.stopPropagation();
  };

  return (
    <ListGroupItem>
      <p>
        {ownsTask && (
          <DeleteButton
            className="far fa-times-circle"
            onClick={handleClick}
          ></DeleteButton>
        )}
        {" " + content}
      </p>
    </ListGroupItem>
  );
};

export default Subtask;
