import { Container, Nav, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { logoutUser } from "../../store/slices/signUpSlice/signUpSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import styles from "./NavigatuinBar.module.css";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const { firstName } = useSelector((state) => state.signUp.userInfo);
  const logoutHanddler = () => {
    dispatch(logoutUser());
  };
  const { pathname } = useLocation();
  return (
    <Navbar bg="light" expand="sm">
      <Container>
        <Navbar.Text>Hola {firstName}!</Navbar.Text>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            {pathname !== "/profile" && (
              <Link to={"/profile"} className={`${styles["icon"]}`}>
                <FontAwesomeIcon
                  className={`${styles["user"]}`}
                  icon={faUser}
                />
              </Link>
            )}
            {pathname !== "/" && (
              <Link to={"/"} className={`${styles["icon"]}`}>
                <FontAwesomeIcon
                  icon={faHome}
                  className={`${styles["house"]}`}
                />
              </Link>
            )}
            <Link
              className={`${styles["icon"]}`}
              onClick={logoutHanddler}
              to={"/login"}
            >
              <FontAwesomeIcon
                className={`${styles["power"]}`}
                icon={faPowerOff}
              />
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default NavigationBar;
