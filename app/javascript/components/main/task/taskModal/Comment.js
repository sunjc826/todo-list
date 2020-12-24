import React from "react";
import { ListGroupItem } from "reactstrap";
import { DeleteButton } from "../Task";
import { useDispatch } from "react-redux";
import { deleteComment } from "../../../../redux/actions";

const Comment = ({ content, taskId, commentId }) => {
  const dispatch = useDispatch();
  const handleClick = (e) => {
    dispatch(deleteComment(taskId, commentId));
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

export default Comment;
