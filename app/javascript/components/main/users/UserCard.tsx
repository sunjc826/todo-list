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
}
interface ParamTypes {
  projectId: string;
}
const UserCard = ({ ele, isCurrentUser, interactive }: AppProps) => {
  const userState = useSelector((state: RootState) => state.user);
  const userId = userState.userId;
  const { projectId } = useParams<ParamTypes>();
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

  return (
    <Card body>
      <CardTitle tag="h5">{`${ele.attributes.name}${
        isCurrentUser ? " (You)" : ""
      }`}</CardTitle>
      <CardText>
        <i className="far fa-envelope"></i> {ele.attributes.email}
      </CardText>
      {interactive ? (
        <Button
          color={isCurrentUser ? "danger" : "primary"}
          onClick={handleClick}
          disabled={isCurrentUser}
        >
          Share
        </Button>
      ) : null}
    </Card>
  );
};

export default UserCard;
