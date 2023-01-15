import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Figure, Form, Modal } from "react-bootstrap";
import { faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { pictureInfo } from "../../../store/slices/pictureSlice/pictureSlice";
import { useDispatch, useSelector } from "react-redux";

export const PictureModal = ({ handleformsubmit, onHide, showModal, pic }) => {
  const { photoInfo } = useSelector((store) => store.picture);
  const { title, description } = photoInfo;

  const dispatch = useDispatch();
  const handdleTitle = (event) => {
    dispatch(pictureInfo({ ...photoInfo, title: event.target.value }));
  };
  const handdleDescription = (event) => {
    dispatch(pictureInfo({ ...photoInfo, description: event.target.value }));
  };
  return (
    <Modal
      show={showModal}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          Image Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Label>Title</Form.Label>
        <Form.Control
          placeholder="Title"
          aria-label="Title"
          type="text"
          onChange={handdleTitle}
          value={title || ""}
        />

        <Form.Label>Description</Form.Label>
        <Form.Control
          placeholder="Picture description"
          aria-label="description"
          type="text"
          as="textarea"
          rows="2"
          onChange={handdleDescription}
          value={description || ""}
        />
        <Figure className="d-block text-center m-4">
          <Figure.Image width={171} height={180} alt="171x180" src={pic} />
        </Figure>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Cancel</Button>
        <Button
          variant="link"
          style={{ fontSize: "2rem" }}
          type="submit"
          onClick={handleformsubmit}
        >
          <FontAwesomeIcon icon={faCloudUpload} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
