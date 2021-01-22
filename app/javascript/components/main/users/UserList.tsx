import React, { Fragment, useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardText,
  Button,
  Jumbotron,
  Badge,
} from "reactstrap";
import normalize from "json-api-normalizer";
import {
  DataRecord,
  NormalizedData,
  UserAttributes,
} from "../../../redux/shared";
import { UserState } from "../../../redux/user/userReducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import UserCard from "./UserCard";
import { useParams } from "react-router-dom";

// This will not make use of the redux store

// interactive denotes if the user entries will be clickable
interface AppProps {
  interactive?: boolean;
}
interface ParamTypes {
  projectId: string;
}
const UserList = ({ interactive }: AppProps) => {
  const userState = useSelector((state: RootState) => state.user);
  const [usersData, setUsersData] = useState<DataRecord<UserAttributes>>();
  const userId = userState.userId;
  const projectState = useSelector((state: RootState) => state.project);
  const { projectId } = useParams<ParamTypes>();
  const [userBadgesComponent, setUserBadgesComponent] = useState<JSX.Element[]>(
    []
  );
  useEffect(() => {
    const url = "/api/v1/users";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Fetch Err");
        }
      })
      .then((res: NormalizedData) => {
        return normalize(res);
      })
      .then((res) => {
        // console.log(res);
        setUsersData(res.user);
      });
  }, []);

  useEffect(() => {
    if (interactive && usersData) {
      console.log("reached");
      const sharedUsers = projectState.data![projectId!].relationships
        .sharedUsers.data;
      const arr = sharedUsers.map((ele) => {
        const user = usersData![ele.id];
        const name = user.attributes.name;
        return (
          <Badge color="primary" key={ele.id}>
            {name}
          </Badge>
        );
      });
      setUserBadgesComponent(arr);
    }
  }, [usersData]);

  const usersComponent = [];
  if (usersData) {
    for (const key in usersData) {
      const ele = usersData[key];
      const isCurrentUser = Number(userId) === Number(key);

      const component = (
        <Col
          xs="6"
          md="4"
          key={ele.id}
          className="my-3 btn-hide btn-transition"
        >
          <UserCard
            ele={ele}
            isCurrentUser={isCurrentUser}
            interactive={interactive}
            projectId={projectId}
          />
        </Col>
      );
      usersComponent.push(component);
    }
  }

  return (
    <Container>
      {interactive ? <Row>{userBadgesComponent}</Row> : null}
      <Row className="mt-1">{usersComponent}</Row>
    </Container>
  );
};

export default UserList;
