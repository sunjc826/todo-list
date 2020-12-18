import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Row, Col, Container, Jumbotron } from "reactstrap";

const user_id = 1;

const Home = () => {
  const userState = useSelector((state) => state.user);
  console.log("USER STATE");
  const userData = userState.data;
  console.log(userData);
  // console.log(userData["1"]);
  // const userData = userState.data[user_id.toString()].attributes;
  // const { name, email } = userData;

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
            <p>Hello, </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
