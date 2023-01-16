import { faClose, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  albumIdValidator,
  albumNameValidator,
  enableShowAlbums,
} from "../../../store/slices/albumSlice/albumSlice";
import { getAlbum } from "../../../store/slices/albumSlice/thunk";
import { AlbumInput } from "./AlbumInput/AlbumInput";
import { AlbumSelect } from "./AlbumSelect/AlbumSelect";
import styles from "./ModalForm.module.css";

export const ModalForm = ({ selected, setSelected }) => {
  const [albumTextInput, setAlbumTextInput] = useState(false);
  const { showAlbumList } = useSelector((state) => state.album);
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
              <AlbumSelect
                selected={selected}
                setSelected={setSelected}
                setAlbumTextInput={setAlbumTextInput}
              />
            )}

            {albumTextInput && (
              <AlbumInput selected={selected} setSelected={setSelected} />
            )}
          </Form>
        </div>
      </div>
    </div>
  );
};
