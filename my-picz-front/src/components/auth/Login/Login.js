import { Button, Col, Container, Row } from "react-bootstrap";
import photosLogin from "../../../assets/images/photosLogin.svg";
import { Link } from "react-router-dom";
import LoginForm from "./LoginForm/LoginForm";
import { useDispatch, useSelector } from "react-redux";
import {
  enableViewLogin,
  passwordFieldsValidator,
  usernameFieldsValidator,
} from "../../../store/slices/signUpSlice/signUpSlice";

const Login = () => {
  const { validFields } = useSelector((state) => state.signUp);
  const dispatch = useDispatch();
  const siginHandler = () => {
    dispatch(usernameFieldsValidator({ ...validFields, username: true }));
    dispatch(passwordFieldsValidator({ ...validFields, password: true }));
    dispatch(enableViewLogin());
  };
  return (
    <div className="App">
      <Container>
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <LoginForm />
          </Col>

          <Col xs={12} sm={12} md={6} lg={6} xl={6} xxl={6}>
            <div>
              <img
                src={photosLogin}
                alt="Album, boy a girl pasting pictures on a huge album"
              />
              <p>Sing up instead if you dont have an account yet</p>
              <Link to={"/sign"}>
                <Button onClick={siginHandler} variant="secondary">
                  Sign up
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
