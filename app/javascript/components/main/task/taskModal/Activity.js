import React from "react";
import { ListGroupItem } from "reactstrap";

const crudToColor = {
  c: "success",
  u: "warning",
  d: "danger",
};

const crudToString = {
  c: "Created",
  u: "Edited",
  d: "Deleted",
};

const Activity = ({ crudType, item, createdAt }) => {
  return (
    <ListGroupItem>
      <p>
        <span className={`text-${crudToColor[crudType]}`}>
          {crudToString[crudType]}
        </span>{" "}
        {item} at {new Date(createdAt).toTimeString()}
      </p>{" "}
    </ListGroupItem>
  );
};

export default Activity;
