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
  FormFeedback,
} from "reactstrap";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { register, login } from "../../redux/actions";
import { required, validEmail } from "../../validators";
const Viewport = styled.div`
  height: 100vh;
`;

const RegisterForm = () => {
  const dispatch = useDispatch();
  const defaultFormState = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  };
  const defaultFormValid = {
    name: false,
    email: false,
    password: false,
    password_confirmation: false,
  };
  const defaultFormTouched = {
    name: false,
    email: false,
    password: false,
    password_confirmation: false,
  };

  const [formState, setFormState] = useState(defaultFormState);
  const [formValid, setFormValid] = useState(defaultFormValid);
  const [formTouched, setFormTouched] = useState(defaultFormTouched);
  const formValidators = {
    name: [required],
    email: [required, validEmail],
    password: [required],
    password_confirmation: [(field) => field === formState.password],
  };

  const handleBlur = (e) => {
    setFormTouched({
      ...formTouched,
      [e.target.name]: true,
    });
  };

  const handleChange = (e) => {
    let fieldValid = formValidators[e.target.name].reduce(
      (isValid, validator) => {
        return isValid && validator(e.target.value);
      },
      true
    );
    fieldValid = Boolean(fieldValid);
    setFormValid({
      ...formValid,
      [e.target.name]: fieldValid,
    });
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(formState));
    reset();
  };

  const reset = () => {
    setFormState(defaultFormState);
    setFormTouched(defaultFormTouched);
    setFormValid(defaultFormValid);
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
          onBlur={handleBlur}
          valid={formTouched.name && formValid.name}
          invalid={formTouched.name && !formValid.name}
        />
        <FormFeedback valid>Nice name you have there</FormFeedback>
        <FormFeedback>You must have a name!</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formState.email}
          onChange={handleChange}
          onBlur={handleBlur}
          valid={formTouched.email && formValid.email}
          invalid={formTouched.email && !formValid.email}
        />
        <FormFeedback valid>Email bounces right off my tongue</FormFeedback>
        <FormFeedback>Email must be valid</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
          onBlur={handleBlur}
          valid={formTouched.password && formValid.password}
          invalid={formTouched.password && !formValid.password}
        />
        <FormFeedback valid>I like your password</FormFeedback>
        <FormFeedback>You must have a password!</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          id="password_confirmation"
          name="password_confirmation"
          placeholder="Confirm password"
          value={formState.password_confirmation}
          onChange={handleChange}
          onBlur={handleBlur}
          valid={
            formTouched.password_confirmation && formValid.password_confirmation
          }
          invalid={
            formTouched.password_confirmation &&
            !formValid.password_confirmation
          }
        />
        <FormFeedback valid>
          Your password confirmation skills are remarkable!
        </FormFeedback>
        <FormFeedback>
          This field must be the same as your password
        </FormFeedback>
      </FormGroup>
      <Button>Register</Button>
    </Form>
  );
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const defaultFormState = {
    email: "",
    password: "",
  };
  const defaultFormValid = {
    email: false,
    password: false,
  };
  const defaultFormTouched = {
    email: false,
    password: false,
  };
  const formValidators = {
    email: [required, validEmail],
    password: [required],
  };
  const [formState, setFormState] = useState(defaultFormState);
  const [formValid, setFormValid] = useState(defaultFormValid);
  const [formTouched, setFormTouched] = useState(defaultFormTouched);

  const handleBlur = (e) => {
    setFormTouched({
      ...formTouched,
      [e.target.name]: true,
    });
  };

  const handleChange = (e) => {
    let fieldValid = formValidators[e.target.name].reduce(
      (isValid, validator) => {
        return isValid && validator(e.target.value);
      },
      true
    );
    fieldValid = Boolean(fieldValid);
    setFormValid({
      ...formValid,
      [e.target.name]: fieldValid,
    });
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formState));
    reset();
  };

  const reset = () => {
    setFormState(defaultFormState);
    setFormTouched(defaultFormTouched);
    setFormValid(defaultFormValid);
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
          onBlur={handleBlur}
          valid={formTouched.email && formValid.email}
          invalid={formTouched.email && !formValid.email}
        />
        <FormFeedback valid>Welcome back, {formState.email}</FormFeedback>
        <FormFeedback>Email is not valid</FormFeedback>
      </FormGroup>
      <FormGroup>
        <Input
          type="text"
          id="password"
          name="password"
          placeholder="Password"
          value={formState.password}
          onChange={handleChange}
          onBlur={handleBlur}
          valid={formTouched.password && formValid.password}
          invalid={formTouched.password && !formValid.password}
        />
        <FormFeedback valid>Yep that's a valid password</FormFeedback>
        <FormFeedback>Password must be non-empty</FormFeedback>
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
