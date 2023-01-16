import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, Row, Stack } from "react-bootstrap";
import NavigationBar from "../Navbar/NavigationBar";
import gravatar from "../../assets/images/avatar.svg";
import styles from "./Profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { usePrivate } from "../hooks/usePrivate";
import { setCookie } from "../utils/cookieFactory";

export const Profile = () => {
  const { idUser: id } = useSelector((state) => state.signUp.userInfo);

  const [user, setUser] = useState();
  const axiosPrivate = usePrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUser = async () => {
      try {
        console.log(id);
        const response = await axiosPrivate.get(`/user/${id}`);
        isMounted && setUser(response.data);
        setCookie("UserInfo", JSON.stringify(response.data), 1);
      } catch (err) {
        console.error(err);
        // navigate("/login", { state: { from: location }, replace: true });
      }
    };
    getUser();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

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
                <Card.Text>{user?.biography}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col className={`${styles["verticalCol"]}`}>
            <Stack className={`${styles["verticalStack"]}`} gap={3}>
              <Row>
                <Col>
                  <h6>USERNAME</h6>
                  <p>{user?.username}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6>FIRSTNAME</h6>
                  <p>{user?.firstName}</p>
                </Col>
                <Col>
                  <h6>LASTNAME</h6>
                  <p>{user?.lastName}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h6>EMAIL</h6>
                  <p>{user?.email}</p>
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
