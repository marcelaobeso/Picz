import React from "react";
import { Alert } from "react-bootstrap";
import { useSelector } from "react-redux";
import NavigationBar from "./Navbar/NavigationBar";
import { Pictures } from "./picture/Pictures";

export const Dashboard = () => {
  const { alert, showAlert } = useSelector((state) => state.alert);

  return (
    <>
      <NavigationBar />
      {showAlert && <Alert variant="danger">{alert}</Alert>}
      <Pictures />
    </>
  );
};
