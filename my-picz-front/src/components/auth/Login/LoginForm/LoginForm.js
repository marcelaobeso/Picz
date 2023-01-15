import { Alert, Button, FloatingLabel, Form } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import styles from "../../Signin/SignUpForm/SignUpForm.module.css";
import {
  passwordFieldsValidator,
  signUpUser,
  usernameFieldsValidator,
} from "../../../../store/slices/signUpSlice/signUpSlice";
import { useAuthStore } from "../../../hooks/useAuthStore.js";

const LoginForm = () => {
  const { alert, showAlert } = useSelector((state) => state.alert);

  const { userInfo, validFields } = useSelector((state) => state.signUp);
  const dispatch = useDispatch();
  const usernameHandler = (event) => {
    if (event.target.value.trim().length > -1) {
      dispatch(signUpUser({ ...userInfo, username: event.target.value }));
      dispatch(usernameFieldsValidator({ ...validFields, username: true }));
    }
  };
  const passwordHandler = (event) => {
    if (event.target.value.trim().length > -1) {
      dispatch(
        signUpUser({
          ...userInfo,
          password: event.target.value,
          password2: event.target.value,
        })
      );
      dispatch(passwordFieldsValidator({ ...validFields, password: true }));
    }
  };
  const { loggin } = useAuthStore();
  const formHandler = (event) => {
    event.preventDefault();
    if (
      userInfo.username.trim().length === 0 ||
      userInfo.password.trim().length === 0
    ) {
      if (userInfo.username.trim().length === 0) {
        dispatch(usernameFieldsValidator({ ...validFields, username: false }));
        dispatch(signUpUser({ ...userInfo, username: "" }));
      }
      if (userInfo.password.trim().length === 0) {
        dispatch(passwordFieldsValidator({ ...validFields, password: false }));
        dispatch(signUpUser({ ...userInfo, password: "" }));
      }
      return;
    }

    loggin({ username: userInfo.username, password: userInfo.password });
  };

  return (
    <Form onSubmit={formHandler}>
      {showAlert && <Alert variant="danger">{alert}</Alert>}

      <Form.Group className="mb-3">
        <FloatingLabel
          controlId="username"
          label="Username"
          className={`${styles["form-control"]} ${
            !validFields.username && styles.invalid
          }`}
        >
          <Form.Control
            onChange={usernameHandler}
            value={userInfo.username}
            type="text"
            placeholder="name@example.com"
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="mb-3">
        <FloatingLabel
          controlId="password"
          label="Password "
          className={`${styles["form-control"]} ${
            !validFields.password && styles.invalid
          }`}
        >
          <Form.Control
            onChange={passwordHandler}
            value={userInfo.password}
            type="password"
            placeholder="Password"
          />
        </FloatingLabel>
      </Form.Group>
      {validFields.message && <p>{validFields.message}</p>}
      <Button variant="dark" type="submit">
        Login
      </Button>
    </Form>
  );
};

export default LoginForm;
