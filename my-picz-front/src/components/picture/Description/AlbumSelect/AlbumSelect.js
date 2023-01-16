import { faBookBookmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  albumIdValidator,
  enableShowAlbums,
  selectedAlbum,
} from "../../../../store/slices/albumSlice/albumSlice";
import { linkToAlbum } from "../../../../store/slices/albumSlice/thunk";
import styles from "../ModalForm.module.css";

export const AlbumSelect = ({ selected, setSelected }) => {
  const [albumTextInput, setAlbumTextInput] = useState(false);
  const { albumList, showAlbumList, album, validFields } = useSelector(
    (state) => state.album
  );
  const dispatch = useDispatch();
  const handleAlbumNameSelection = (e) => {
    dispatch(albumIdValidator(true));
    dispatch(selectedAlbum({ ...album, id_album: e.target.value }));
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
  return (
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
            <FontAwesomeIcon style={{ fontSize: "2rem" }} icon={faPlus} />
          </Button>
        </Form.Group>
      </Row>
    </Col>
  );
};
