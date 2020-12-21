import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Container, Jumbotron } from "reactstrap";

const user_id = 1;

const Home = ({ userState }) => {
  // const userState = useSelector((state) => state.user);
  const userId = userState.userId;
  const userLoading = userState.loading;
  const userData = userState.data;
  const userErrMsg = userState.errMsg;

  return (
    <div>
      <Jumbotron fluid className="bg-primary border-rect">
        <Container>
          <h1>Todo list, v0.1.0</h1>
        </Container>
      </Jumbotron>
      <Container>
        <Row>
          <Col xs="12">
            {userLoading || !userData ? null : (
              <p>Welcome, {userData[userId.toString()].attributes.name}</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
