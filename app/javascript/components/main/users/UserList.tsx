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

// This will not make use of the redux store

// interactive denotes if the user entries will be clickable
interface AppProps {
  interactive?: boolean;
}

const UserList = ({ interactive }: AppProps) => {
  const userState = useSelector((state: RootState) => state.user);
  const [usersData, setUsersData] = useState<DataRecord<UserAttributes>>();
  const userId = userState.userId;

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
        console.log(res);
        setUsersData(res.user);
      });
  }, []);

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
          />
        </Col>
      );
      usersComponent.push(component);
    }
  }

  return (
    <Container>
      <Row className="mt-1">{usersComponent}</Row>
    </Container>
  );
};

export default UserList;
