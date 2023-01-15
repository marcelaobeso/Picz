import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useRef, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPictureInfo,
  pictureInfo,
} from "../../../store/slices/pictureSlice/pictureSlice";
import { PictureModal } from "./PictureModal";
import "./AddPicture.css";
import { savePicture } from "../../../store/slices/pictureSlice/thunk";

export const AddPicture = () => {
  const photoInfo = useSelector((store) => store.picture);
  const [picture, setPicture] = useState("");
  const [preview, setPreview] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!picture) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(picture);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [picture]);
  const fileInput = useRef(null);
  const handleCancel = () => {
    setPicture("");
    setModalShow(false);
    dispatch(clearPictureInfo);
  };
  const handleAddPhoto = (event) => {
    setPicture(event.target.files[0]);
    if (event.target.files[0]) {
      dispatch(
        pictureInfo({
          ...photoInfo,
          name: event.target.files[0].name.replaceAll(" ", ""),
        })
      );
      setModalShow(true);
    }
  };
  const handleInput = () => {
    fileInput.current.click();
  };

  const handleForm = (event) => {
    event.preventDefault();
    dispatch(savePicture(picture));
    setModalShow(false);
    setPicture("");
  };

  return (
    <Container className="selected">
      <form onSubmit={handleForm}>
        <input
          style={{ display: "none" }}
          type="file"
          onChange={handleAddPhoto}
          ref={fileInput}
          accept="image/.jpg,.png"
        />
        {/* // //boton de agregar */}
        <div style={{ textAlign: "center", margin: "2rem" }}>
          <Button variant="secondary" onClick={handleInput}>
            <FontAwesomeIcon style={{ fontSize: "2rem" }} icon={faPlus} />
            <h4>Add Pic</h4>
          </Button>
        </div>

        <PictureModal
          showModal={modalShow}
          onHide={handleCancel}
          handleformsubmit={handleForm}
          pic={preview}
        />
      </form>
    </Container>
  );
};
