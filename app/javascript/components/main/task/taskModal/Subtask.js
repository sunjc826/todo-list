import React from "react";
import { ListGroupItem } from "reactstrap";

const Subtask = ({ content }) => {
  return (
    <ListGroupItem action>
      <p>{content}</p>
    </ListGroupItem>
  );
};

export default Subtask;
