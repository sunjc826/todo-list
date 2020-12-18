import React, { Fragment } from "react";
import { Container, Jumbotron } from "reactstrap";

const Home = () => {
  return (
    <div>
      <Jumbotron fluid className="bg-primary border-rect">
        <Container>
          <h1>Welcome to Todo list, v0.1.0</h1>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Home;
