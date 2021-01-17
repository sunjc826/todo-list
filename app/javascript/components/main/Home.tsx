import React, { useContext, useEffect } from "react";
import { Row, Col, Container, Jumbotron } from "reactstrap";
import { AlertContext } from "../Main";
import { useHistory } from "react-router-dom";
import { UserState } from "../../redux/user/userReducer";
import { Link } from "react-router-dom";
interface AppProps {
  userState: UserState;
}

const Home = ({ userState }: AppProps) => {
  const userId = userState.userId;
  const userLoading = userState.loading;
  const userData = userState.data;
  const userErrMsg = userState.errMsg;

  const { toggleAlert } = useContext(AlertContext)!;
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
      <Jumbotron className="border-rect">
        <Container>
          <h1 className="display-3"> Welcome</h1>
          {userLoading || !userData ? null : (
            <p className="lead">
              {userData[userId!.toString()].attributes.name}
            </p>
          )}
          <hr className="my-2" />
          <Link to="/support">Getting started</Link>
        </Container>
      </Jumbotron>
    </div>
  );
};

export default Home;
