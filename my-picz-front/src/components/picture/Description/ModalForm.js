import {
  faBookBookmark,
  faClose,
  faFolderPlus,
  faPlus,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  albumIdValidator,
  albumNameValidator,
  enableShowAlbums,
  selectedAlbum,
} from "../../../store/slices/albumSlice/albumSlice";
import {
  getAlbum,
  linkAndCreateAlbum,
  linkToAlbum,
} from "../../../store/slices/albumSlice/thunk";
import styles from "./ModalForm.module.css";

export const ModalForm = ({ selected, setSelected }) => {
  const [albumTextInput, setAlbumTextInput] = useState(false);
  const { albumList, showAlbumList, album, validFields } = useSelector(
    (state) => state.album
  );
  const { description, title } = selected;
  const dispatch = useDispatch();
  const handleAddAlbums = () => {
    dispatch(getAlbum());
    dispatch(enableShowAlbums(true));
  };
  const handleClose = () => {
    setSelected(null);
    dispatch(albumNameValidator(true));
    dispatch(enableShowAlbums(false));
    dispatch(albumIdValidator(true));
  };
  const handleAlbumNameSelection = (e) => {
    dispatch(albumIdValidator(true));
    dispatch(selectedAlbum({ ...album, id_album: e.target.value }));
    console.log(e.target.value);
    console.log(selected);
  };
  const handleAddToAlbum = () => {
    if (album.id_album === "Select" || album.id_album === "") {
      dispatch(albumIdValidator(false));
      dispatch(selectedAlbum({ ...album, id_album: "" }));
      return;
    }
    const id_photo = Number(selected.id_photo);
    const id_album = Number(album.id_album);
    dispatch(linkToAlbum(id_album, id_photo));
    dispatch(enableShowAlbums(false));
    dispatch(selectedAlbum({ ...album, id_album: "" }));

    setSelected(null);
  };
  const handleNewAlbum = () => {
    setAlbumTextInput(true);
  };
  const handleNewAlbumTitle = (event) => {
    dispatch(albumNameValidator(true));
    dispatch(selectedAlbum({ ...album, name: event.target.value }));
    console.log(event.target.value);
  };

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
  if (!selected) {
    return null;
  }
  return (
    <div onClick={handleClose} className={`${styles["overlay"]} `}>
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className={`${styles["modalContainer"]} ${styles["miaw"]} `}
      >
        <img src={selected.url} alt="/" />
        <div className={`${styles["modalRight"]} `}>
          <Button
            className={`${styles["closeBtn"]} `}
            variant="link"
            onClick={handleClose}
          >
            <FontAwesomeIcon style={{ fontSize: "2rem" }} icon={faClose} />
          </Button>{" "}
          <Form>
            <Row className="mb-3">
              <h3>{title}</h3>
            </Row>
            {description && (
              <Row>
                <Form.Label>Description</Form.Label>
                <p>{description}</p>
              </Row>
            )}
            <Row className="mb-3">
              <Button variant="link" onClick={handleAddAlbums}>
                <FontAwesomeIcon
                  style={{ fontSize: "3rem" }}
                  icon={faFolderPlus}
                />
              </Button>
              <Form.Label style={{ textAlign: "center" }}>
                Add this picture to an album
              </Form.Label>
            </Row>
            {showAlbumList && (
              <Col>
                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Select the album</Form.Label>
                    <Form.Select
                      id="availableAlbums"
                      onChange={handleAlbumNameSelection}
                      className={`${!validFields.id_album && styles.invalid}`}
                    >
                      <option>Select</option>
                      {albumList?.map((i) => (
                        <option value={i.id_album} key={i.id_album}>
                          {i.name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group as={Col} style={{ textAlign: "center" }}>
                    <Form.Label>Add now</Form.Label>
                    <Button variant="link" onClick={handleAddToAlbum}>
                      <FontAwesomeIcon
                        style={{ fontSize: "2rem" }}
                        icon={faBookBookmark}
                      />
                    </Button>
                  </Form.Group>
                </Row>
                <Row>
                  <Form.Group as={Col} style={{ textAlign: "center" }}>
                    <Form.Label>Or add a new Album</Form.Label>
                    <Button variant="link" onClick={handleNewAlbum}>
                      <FontAwesomeIcon
                        style={{ fontSize: "2rem" }}
                        icon={faPlus}
                      />
                    </Button>
                  </Form.Group>
                </Row>
              </Col>
            )}

            {albumTextInput && (
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
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
