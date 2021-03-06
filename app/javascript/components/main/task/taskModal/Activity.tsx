import React from "react";
import { ListGroupItem } from "reactstrap";
import { BootstrapColor, Id, CrudType } from "../../../../redux/shared";

const crudToColor: {
  c: BootstrapColor;
  u: BootstrapColor;
  d: BootstrapColor;
} = {
  c: "success",
  u: "warning",
  d: "danger",
};

const crudToString = {
  c: "Created",
  u: "Edited",
  d: "Deleted",
};

interface AppProps {
  crudType: CrudType;
  item: string;
  createdAt: string;
  activityId: Id;
}

const Activity = ({ crudType, item, createdAt }: AppProps) => {
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
