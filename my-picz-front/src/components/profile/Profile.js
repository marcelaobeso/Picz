import React from "react";
import { Card, Col, Container, Image, Row, Stack } from "react-bootstrap";
import NavigationBar from "../Navbar/NavigationBar";
import gravatar from "../../assets/images/avatar.svg";
import styles from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

export const Profile = () => {
  const { userInfo } = useSelector((state) => state.signUp);
  const { username, firstName, lastName, email, bio } = userInfo;
  return (
    <>
      <NavigationBar />
      <Container>
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
          <Col sm={{ order: "first" }} lg={{ order: "first" }}>
            <Card>
              <Card.Body>
                <Card.Title>BIO</Card.Title>
                <Card.Text>{bio}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className={`${styles["verticalCol"]}`}>
            <Stack className={`${styles["verticalStack"]}`} gap={3}>
              <Row>
                <Col>
                  <h6>USERNAME</h6>
                  <p>{username}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6>FIRSTNAME</h6>
                  <p>{firstName}</p>
                </Col>
                <Col>
                  <h6>LASTNAME</h6>
                  <p>{lastName}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6>EMAIL</h6>
                  <p>{email}</p>
                </Col>
              </Row>

              <Row>
                <Link to={"/profile/edit"} className={`${styles["icon"]}`}>
                  <FontAwesomeIcon icon={faUserEdit} />
                </Link>
              </Row>
            </Stack>
          </Col>
        </Row>
      </Container>
    </>
  );
};
