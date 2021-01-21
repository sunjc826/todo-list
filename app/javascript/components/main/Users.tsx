import React, { Fragment } from "react";
import { Container, Jumbotron } from "reactstrap";
import UserList from "./users/UserList";

const Users = () => {
  return (
    <Fragment>
      <Jumbotron>
        <Container>
          <h1>Fellow Users</h1>
        </Container>
      </Jumbotron>
      <UserList />
    </Fragment>
  );
};

export default Users;
