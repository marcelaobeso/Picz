import { faSave } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  albumNameValidator,
  enableShowAlbums,
  selectedAlbum,
} from "../../../../store/slices/albumSlice/albumSlice";
import { linkAndCreateAlbum } from "../../../../store/slices/albumSlice/thunk";
import styles from "../ModalForm.module.css";

export const AlbumInput = ({ setSelected, selected }) => {
  const { albumList, showAlbumList, album, validFields } = useSelector(
    (state) => state.album
  );
  const dispatch = useDispatch();
  const handleSaveAlbum = () => {
    if (album.name.trim() === "") {
      console.log("nel");
      dispatch(albumNameValidator(false));
      return;
    }
    dispatch(linkAndCreateAlbum(selected.id_photo, album.name));

    dispatch(selectedAlbum({ ...album, name: "" }));
    setSelected(null);
    dispatch(enableShowAlbums(false));
  };
  const handleNewAlbumTitle = (event) => {
    dispatch(albumNameValidator(true));
    dispatch(selectedAlbum({ ...album, name: event.target.value }));
    console.log(event.target.value);
  };
  return (
    <Row>
      <Form.Group as={Col}>
        <Form.Label>New album name:</Form.Label>
        <Form.Control
          className={`${!validFields.name && styles.invalid}`}
          type={"text"}
          onChange={handleNewAlbumTitle}
        />
      </Form.Group>
      <Form.Group className={`${styles["containerSave"]}`} as={Col}>
        <Button variant="link" onClick={handleSaveAlbum}>
          <FontAwesomeIcon
            style={{ fontSize: "2rem", marginRight: "1rem" }}
            icon={faSave}
          />
          Save
        </Button>
      </Form.Group>
    </Row>
  );
};
