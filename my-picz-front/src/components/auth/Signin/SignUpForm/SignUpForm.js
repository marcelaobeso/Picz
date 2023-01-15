import { Alert, Button, FloatingLabel, Form, Row } from "react-bootstrap";
import {
  emailFieldsValidator,
  messageFieldsValidator,
  password2FieldsValidator,
  passwordFieldsValidator,
  signUpUser,
  usernameFieldsValidator,
} from "../../../../store/slices/signUpSlice/signUpSlice";
import { useDispatch, useSelector } from "react-redux";
import styles from "./SignUpForm.module.css";
import { useAuthStore } from "../../../hooks/useAuthStore.js";

const SignUpForm = () => {
  const { alert, showAlert } = useSelector((state) => state.alert);

  const dispatch = useDispatch();
  const { userInfo, validFields } = useSelector((state) => state.signUp);

  const emailHandler = (event) => {
    if (event.target.value.length > 4) {
      dispatch(emailFieldsValidator({ ...validFields, email: true }));
    }
    dispatch(signUpUser({ ...userInfo, email: event.target.value }));
  };
  const passwordHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      dispatch(passwordFieldsValidator({ ...validFields, password: true }));
    }
    dispatch(signUpUser({ ...userInfo, password: event.target.value }));
  };
  const password2Handler = (event) => {
    if (event.target.value.trim().length > 0) {
      dispatch(password2FieldsValidator({ ...validFields, password2: true }));
    }
    dispatch(signUpUser({ ...userInfo, password2: event.target.value }));
  };
  const usernameHandler = (event) => {
    if (event.target.value.trim().length > 0) {
      dispatch(usernameFieldsValidator({ ...validFields, username: true }));
    }
    dispatch(signUpUser({ ...userInfo, username: event.target.value }));
  };
  const { signin } = useAuthStore();
  const formHandler = (event) => {
    event.preventDefault();
    if (
      userInfo.email.trim().length === 0 ||
      userInfo.password.trim().length === 0 ||
      userInfo.password2.trim().length === 0 ||
      userInfo.username.trim().length === 0 ||
      userInfo.password !== userInfo.password2
    ) {
      if (userInfo.email.length === 0) {
        dispatch(emailFieldsValidator({ ...validFields, email: false }));
        dispatch(signUpUser({ ...userInfo, email: "" }));
      }
      if (userInfo.password.trim().length === 0) {
        dispatch(passwordFieldsValidator({ ...validFields, password: false }));
        dispatch(signUpUser({ ...userInfo, password: "" }));
      }
      if (userInfo.password2.trim().length === 0) {
        dispatch(
          password2FieldsValidator({ ...validFields, password2: false })
        );
        dispatch(signUpUser({ ...userInfo, password2: "" }));
      }
      if (userInfo.username.trim().length === 0) {
        dispatch(usernameFieldsValidator({ ...validFields, username: false }));
        dispatch(signUpUser({ ...userInfo, username: "" }));
      }
      if (userInfo.password !== userInfo.password2) {
        dispatch(passwordFieldsValidator({ ...validFields, password: false }));
        dispatch(signUpUser({ ...userInfo, password: "", password2: "" }));
        dispatch(
          password2FieldsValidator({ ...validFields, password2: false })
        );
        dispatch(
          messageFieldsValidator({
            ...validFields,
            message: "Password must match both fields",
          })
        );
        return;
      }
      dispatch(
        messageFieldsValidator({
          ...validFields,
          message: "All fields must be entered",
        })
      );

      return;
    }
    signin({
      email: userInfo.email,
      password: userInfo.password,
      username: userInfo.username,
    });
    return;
  };
  return (
    <>
      {showAlert && <Alert variant="danger">{alert}</Alert>}
      <Form onSubmit={formHandler}>
        <Row
          className={`${styles["form-control"]} ${
            !validFields.email && styles.invalid
          }`}
        >
          <Form.Group className="mb-3">
            <FloatingLabel
              onChange={emailHandler}
              controlId="email"
              label="Email address "
            >
              <Form.Control type="email" placeholder="name@example.com" />
            </FloatingLabel>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
        </Row>
        <Row
          className={`${styles["form-control"]} ${
            !validFields.username && styles.invalid
          }`}
        >
          <Form.Group className="mb-3">
            <FloatingLabel
              onChange={usernameHandler}
              controlId="username"
              label="Username"
            >
              <Form.Control type="text" placeholder="Username" />
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row
          className={`${styles["form-control"]} ${
            !validFields.password && styles.invalid
          }`}
        >
          <Form.Group className="mb-3">
            <FloatingLabel controlId="password" label="Password ">
              <Form.Control
                value={userInfo.password}
                type="password"
                onChange={passwordHandler}
                placeholder="Password"
              />
            </FloatingLabel>
          </Form.Group>
        </Row>
        <Row
          className={`${styles["form-control"]} ${
            !validFields.password2 && styles.invalid
          }`}
        >
          <Form.Group className="mb-3">
            <FloatingLabel
              onChange={password2Handler}
              controlId="password2"
              label="Verify Password"
            >
              <Form.Control type="password" placeholder="Verify Password" />
            </FloatingLabel>
          </Form.Group>
        </Row>
        {validFields.message && <p>{validFields.message}</p>}
        <Button variant="dark" type="submit">
          SignUp
        </Button>
      </Form>
    </>
  );
};

export default SignUpForm;
