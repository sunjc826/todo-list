import React from "react";
import { ListGroupItem } from "reactstrap";
import { DeleteButton } from "../Task";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../../../redux/actions";
import { Id } from "../../../../redux/shared";

interface AppProps {
  content: string;
  taskId: Id;
  commentId: Id;
  ownsTask: boolean;
}

const Comment = ({ content, taskId, commentId, ownsTask }: AppProps) => {
  const dispatch = useDispatch();
  const handleClick = (e: React.MouseEvent) => {
    dispatch(deleteComment(taskId, commentId));
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

export default Comment;
