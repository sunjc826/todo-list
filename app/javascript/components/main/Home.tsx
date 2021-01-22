import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Container,
  Jumbotron,
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  Button,
} from "reactstrap";
import { AlertContext } from "../Main";
import { useHistory } from "react-router-dom";
import { UserState } from "../../redux/user/userReducer";
import { Link, Route } from "react-router-dom";
import { Id } from "../../redux/shared";
import { generateEditRequest } from "../../helperFunctions";
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
            <Fragment>
              <p className="lead">
                {userData[userId!.toString()].attributes.name}
              </p>
              <Link to="/home/password">Change password</Link>
            </Fragment>
          )}
          <hr className="my-2" />
          <Link to="/support">Getting started</Link>
        </Container>
      </Jumbotron>
      <Container>
        <Route path="/home/password">
          <PasswordChangeForm userId={userId} />
        </Route>
      </Container>
    </div>
  );
};

const defaultFormState = {
  current_password: "",
  new_password: "",
  confirm_password: "",
};
// using Route for conditional rendering instead of boolean variables
const PasswordChangeForm = ({ userId }: { userId: Id }) => {
  const { toggleAlert } = useContext(AlertContext)!;
  const history = useHistory();

  const [formState, setFormState] = useState(defaultFormState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formState.new_password !== formState.confirm_password) {
      toggleAlert({
        message: "New and confirm passwords must be identical",
        color: "danger",
      });
      return;
    } else {
      fetch(
        `/api/v1/users/${userId}/change_password`,
        generateEditRequest(JSON.stringify({ passwords: formState }))
      )
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error();
          }
        })
        .then((res) => {
          toggleAlert({
            message: res["message"],
            color: res["reset"] ? "success" : "danger",
          });
        })
        .catch((err) => {
          toggleAlert({
            message: "Error changing password",
            color: "danger",
          });
        });

      history.push("/home");
      setFormState(defaultFormState);
    }
  };

  const handleCancel = (e: React.MouseEvent) => {
    e.preventDefault();
    history.push("/home");
    setFormState(defaultFormState);
  };

  return (
    <Card body>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label>Current Password</Label>
          <Input
            type="text"
            name="current_password"
            value={formState.current_password}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>New Password</Label>
          <Input
            type="text"
            name="new_password"
            value={formState.new_password}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Confirm New Password</Label>
          <Input
            type="text"
            name="confirm_password"
            value={formState.confirm_password}
            onChange={handleChange}
          />
        </FormGroup>
        <Button type="submit" color="primary">
          Change Password
        </Button>
        <Button type="button" color="danger" onClick={handleCancel}>
          Cancel
        </Button>
      </Form>
    </Card>
  );
};

export default Home;
