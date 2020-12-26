import React, { useContext, useEffect } from "react";
import { Row, Col, Container, Jumbotron } from "reactstrap";
import { AlertContext } from "../Main";
import { useHistory } from "react-router-dom";

const user_id = 1;

const Home = ({ userState }) => {
  const userId = userState.userId;
  const userLoading = userState.loading;
  const userData = userState.data;
  const userErrMsg = userState.errMsg;

  const { setAlertVisible, setAlertMessage } = useContext(AlertContext);
  const history = useHistory();
  useEffect(() => {
    if (userErrMsg) {
      toggleAlert({
        message: "Error loading user data. Please login again.",
        color: "danger",
      });
      setTimeout(() => {
        history.push("/login");
      }, 2000);
    }
  }, []);

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
