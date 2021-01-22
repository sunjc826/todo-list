import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardTitle, CardText, Button } from "reactstrap";
import { generateEditRequest } from "../../../helperFunctions";
import { RootState } from "../../../redux/rootReducer";
import {
  AppDispatch,
  Data,
  Id,
  NormalizedData,
  UserAttributes,
} from "../../../redux/shared";
import normalize from "json-api-normalizer";
import { updateProjectData } from "../../../redux/actions";
import { useQuery } from "../../../customHooks";
import { useParams } from "react-router-dom";

interface AppProps {
  ele: Data<UserAttributes>;
  isCurrentUser: boolean;
  interactive?: boolean;
  projectId?: string;
}

const UserCard = ({ ele, isCurrentUser, interactive, projectId }: AppProps) => {
  const userState = useSelector((state: RootState) => state.user);
  const projectState = useSelector((state: RootState) => state.project);

  const userId = userState.userId;

  let isSharedUser = false;
  if (interactive) {
    const sharedUsers = projectState.data![projectId!].relationships
      .sharedUsers;
    const sharedUser = sharedUsers?.data.find((user) => user.id === ele.id);
    isSharedUser = sharedUser !== undefined;
  }

  const dispatch: AppDispatch = useDispatch();

  const shareProjectWith = (shareWithId: Id) => {
    const url = `/api/v1/projects/${projectId}/share/${shareWithId}`;
    fetch(url, generateEditRequest("{}"))
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Error sharing project");
        }
      })
      .then(
        (res): NormalizedData => {
          return normalize(res);
        }
      )
      .then((res) => {
        const { project } = res;
        dispatch(updateProjectData(project));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    shareProjectWith(ele.id);
    alert("Shared Project!");
  };

  let buttonComponent = null;
  if (interactive) {
    if (isSharedUser) {
      buttonComponent = (
        <Button color="success" disabled outline>
          Shared!
        </Button>
      );
    } else if (isCurrentUser) {
      buttonComponent = (
        <Button color="info" disabled outline>
          Owner
        </Button>
      );
    } else {
      buttonComponent = (
        <Button color="primary" onClick={handleClick}>
          Share
        </Button>
      );
    }
  }

  return (
    <Card body>
      <CardTitle tag="h5">{`${ele.attributes.name}${
        isCurrentUser ? " (You)" : ""
      }`}</CardTitle>
      <CardText>
        <i className="far fa-envelope"></i> {ele.attributes.email}
      </CardText>
      {buttonComponent}
    </Card>
  );
};

export default UserCard;
