import React, { Fragment, useState } from "react";
import {
  Form,
  Row,
  Col,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Container,
} from "reactstrap";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { register, login } from "../../redux/actions";

const Viewport = styled.div`
  height: 100vh;
`;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formState));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={formState.name}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          id="password_confirmation"
          name="password_confirmation"
          placeholder="Confirm password"
          value={formState.password_confirmation}
          onChange={handleChange}
        />
      </FormGroup>
      <Button>Register</Button>
    </Form>
  );
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formState));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
        />
      </FormGroup>
      <Button>Login</Button>
    </Form>
  );
};

const Login = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);

  const toggle = () => setModalOpen(!modalOpen);
  const handleClick = (type) => () => {
    setIsLogin(type);
    toggle();
  };

  return (
    <Fragment>
      <Modal isOpen={modalOpen} toggle={toggle}>
        <ModalHeader>{isLogin ? "Login" : "Register"}</ModalHeader>
        <ModalBody>{isLogin ? <LoginForm /> : <RegisterForm />}</ModalBody>
      </Modal>
      <Viewport>
        <Row className="h-100 align-items-center bg-dark text-center">
          <Col xs={{ size: 8 }} md={{ size: 4 }} className="mx-auto">
            <Button color="primary" onClick={handleClick(true)}>
              Login
            </Button>
            <Button color="info" onClick={handleClick(false)}>
              Register
            </Button>
          </Col>
        </Row>
      </Viewport>
    </Fragment>
  );
};

export default Login;
