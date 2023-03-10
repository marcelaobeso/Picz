import { Button, Col, Container, Row } from "react-bootstrap";
import SignUpForm from "./SignUpForm/SignUpForm";
import photosSignup from "../../../assets/images/photosSignup.svg";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  emailFieldsValidator,
  enableViewLogin,
  logoutUser,
  messageFieldsValidator,
  password2FieldsValidator,
  passwordFieldsValidator,
  usernameFieldsValidator,
} from "../../../store/slices/signUpSlice/signUpSlice";

const Signin = () => {
  const { validFields } = useSelector((state) => state.signUp);

  const dispatch = useDispatch();
  const loginHandler = () => {
    dispatch(usernameFieldsValidator({ ...validFields, username: true }));
    dispatch(emailFieldsValidator({ ...validFields, email: true }));
    dispatch(passwordFieldsValidator({ ...validFields, password: true }));
    dispatch(password2FieldsValidator({ ...validFields, password2: true }));
    dispatch(messageFieldsValidator({ ...validFields, message: "" }));

    dispatch(logoutUser());

    dispatch(enableViewLogin());
  };
  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <div>
              <img src={photosSignup} alt="drawn photoAlbum" />
              <p>Log in istead if you already have an account</p>
              <Link to={"/login"}>
                <Button onClick={loginHandler} variant="secondary">
                  Login
                </Button>
              </Link>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <SignUpForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signin;
