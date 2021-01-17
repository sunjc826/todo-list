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
import { DataRecord, NormalizedData, UserAttributes } from "../../redux/shared";
import { UserState } from "../../redux/user/userReducer";

// This will not make use of the redux store

interface AppProps {
  userState: UserState;
}

const Users = ({ userState }: AppProps) => {
  const [usersData, setUsersData] = useState<DataRecord<UserAttributes>>();
  const userId = userState.userId;

  useEffect(() => {
    const url = "api/v1/users";
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
        setUsersData(res.user);
      });
  }, []);

  const usersComponent = [];
  if (usersData) {
    for (const key in usersData) {
      const ele = usersData[key];
      const isCurrentUser = Number(userId) === Number(key);

      const component = (
        <Col xs="6" md="4" key={ele.id} className="my-3">
          <Card body>
            <CardTitle tag="h5">{`${ele.attributes.name}${
              isCurrentUser && " (You)"
            }`}</CardTitle>
            <CardText>
              <i className="far fa-envelope"></i> {ele.attributes.email}
            </CardText>
          </Card>
        </Col>
      );
      usersComponent.push(component);
    }
  }

  return (
    <Fragment>
      <Jumbotron>
        <Container>
          <h1>Fellow Users</h1>
        </Container>
      </Jumbotron>
      <Container>
        <Row className="mt-5">{usersComponent}</Row>
      </Container>
    </Fragment>
  );
};

export default Users;
