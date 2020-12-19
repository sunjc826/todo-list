import React from "react";
import { ListGroupItem } from "reactstrap";

const Comment = ({ content }) => {
  return (
    <ListGroupItem action>
      <p>{content}</p>
    </ListGroupItem>
  );
};

export default Comment;
