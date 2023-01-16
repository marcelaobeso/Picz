import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  Image,
  Row,
  Stack,
} from "react-bootstrap";
import NavigationBar from "../Navbar/NavigationBar";
import gravatar from "../../assets/images/avatar.svg";
import styles from "./Profile.module.css";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  enableChangePassword,
  messageFieldsValidator,
  passwordFieldsValidator,
  signUpUser,
} from "../../store/slices/signUpSlice/signUpSlice";
import { useAuthStore } from "../hooks/useAuthStore";
import { setAlert } from "../../store/slices/alertSlice/alertSlice";
import { addAlert } from "../../store/slices/alertSlice/thunk";
import { getCookie } from "../utils/cookieFactory";

export const ProfileForm = () => {
  const { userInfo, changePassword, validFields } = useSelector(
    (state) => state.signUp
  );
  console.log(userInfo);
  const { showAlert, alert } = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const handdleUsername = (event) => {
    dispatch(signUpUser({ ...userInfo, username: event.target.value }));
  };
  const handdleFirstName = (event) => {
    dispatch(signUpUser({ ...userInfo, firstName: event.target.value }));
  };
  const handdleLastName = (event) => {
    dispatch(signUpUser({ ...userInfo, lastName: event.target.value }));
  };
  const handdleEmail = (event) => {
    dispatch(signUpUser({ ...userInfo, email: event.target.value }));
  };
  const handdlePassword = (event) => {
    dispatch(signUpUser({ ...userInfo, password: event.target.value }));
  };
  const handdlePassword2 = (event) => {
    dispatch(signUpUser({ ...userInfo, password2: event.target.value }));
  };
  const handleChangePassword = (event) => {
    event.target.checked
      ? dispatch(enableChangePassword(true))
      : dispatch(enableChangePassword(false));
  };
  const handleBio = (event) => {
    dispatch(signUpUser({ ...userInfo, bio: event.target.value }));
  };
  const { updateUser } = useAuthStore();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (changePassword) {
      if (userInfo.password !== userInfo.password2) {
        dispatch(passwordFieldsValidator({ ...validFields, password: false }));
        dispatch(signUpUser({ ...userInfo, password: "", password2: "" }));
        dispatch(passwordFieldsValidator({ ...validFields, password2: false }));
        dispatch(
          messageFieldsValidator({
            ...validFields,
            message: "Password must match both fields",
          })
        );
        return;
      }
    }
    dispatch(setAlert("Info saved"));
    dispatch(addAlert());
    updateUser(userInfo);
  };

  useEffect(() => {
    const user = getCookie("UserInfo");
    dispatch(signUpUser(JSON.parse(user)));
    dispatch(enableChangePassword(false));
    dispatch(
      messageFieldsValidator({
        ...validFields,
        message: "",
      })
    );
  }, []);
  return (
    <>
      <NavigationBar />
      {showAlert && <Alert>{alert}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Row sm={3} xs={1}>
          <Col className={`${styles["verticalContainer"]}`}>
            <Image
              src={gravatar}
              roundedCircle
              thumbnail
              fluid
              alt="a smiling robot grayscale"
            />
          </Col>
          <Col
            className={`${styles["verticalCol"]}`}
            sm={{ order: "first" }}
            lg={{ order: "first" }}
          >
            <Row>
              <Card.Title>BIO</Card.Title>
              <Form.Control
                placeholder="biography"
                aria-label="Biography"
                type="text"
                as="textarea"
                rows="15"
                onChange={handleBio}
                value={userInfo.bio}
              />
            </Row>
          </Col>
          <Col className={`${styles["verticalCol"]}`}>
            <Stack className={`${styles["verticalStack"]}`} gap={3}>
              <Row>
                <Col sm="6">
                  <Form.Label>USERNAME</Form.Label>
                  <Form.Control
                    placeholder="Username"
                    aria-label="Username"
                    type="text"
                    onChange={handdleUsername}
                    value={userInfo.username}
                  />
                </Col>
              </Row>
              <Row>
                <Col sm="6">
                  <Form.Label>FIRSTNAME</Form.Label>
                  <Form.Control
                    placeholder="FirstName"
                    aria-label="FirstName"
                    type="text"
                    onChange={handdleFirstName}
                    value={userInfo.firstName}
                  />
                </Col>
                <Col sm="6">
                  <Form.Label>LASTNAME</Form.Label>
                  <Form.Control
                    placeholder="LastName"
                    aria-label="LastName"
                    type="text"
                    onChange={handdleLastName}
                    value={userInfo.lastName}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Label>EMAIL ADDRESS</Form.Label>
                  <Form.Control
                    onChange={handdleEmail}
                    value={userInfo.email}
                    type="email"
                    placeholder="Enter email"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Row sm="12">
                    <Col sm="4">
                      <Form.Label>PASSWORD</Form.Label>
                    </Col>
                    <Col sm="8">
                      <Form.Check
                        type="switch"
                        id="changePass"
                        label="Change Password"
                        onChange={handleChangePassword}
                      />
                    </Col>
                  </Row>
                  {changePassword && (
                    <Form.Control
                      onChange={handdlePassword}
                      value={userInfo.password}
                      type="password"
                      placeholder={userInfo.password}
                    />
                  )}
                </Col>
              </Row>
              {changePassword && (
                <Row>
                  <Col>
                    <Form.Label>VERIFY PASSWORD</Form.Label>
                    <Form.Control
                      onChange={handdlePassword2}
                      value={userInfo.password2}
                      type="password"
                      placeholder={userInfo.password2}
                    />
                  </Col>
                </Row>
              )}
              {validFields.message && <p>{validFields.message}</p>}

              <Row>
                <Button
                  variant="link"
                  type="submit"
                  to={"/profile"}
                  className={`${styles["icon"]}`}
                >
                  <FontAwesomeIcon icon={faSave} />
                </Button>
              </Row>
            </Stack>
          </Col>
        </Row>
      </Form>
    </>
  );
};
