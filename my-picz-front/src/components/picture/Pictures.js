import { faCameraRetro } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Link } from "react-router-dom";
import { selectedAlbum } from "../../store/slices/albumSlice/albumSlice";
import { getAlbum } from "../../store/slices/albumSlice/thunk";
import { getAllPictures } from "../../store/slices/pictureSlice/thunk";
import { AddPicture } from "./AddPicture/AddPicture";
import { Album } from "./album/Album";
import { ModalForm } from "./Description/ModalForm";
import { Picture } from "./Picture";
import "./Pictures.css";

export const Pictures = () => {
  const [selected, setSelected] = useState(null);
  const { albumList, album } = useSelector((state) => state.album);
  const { photos } = useSelector((state) => state.picture);
  const dispatch = useDispatch();
  const handlePickPhoto = (i) => {
    const pick = photos.filter((item) => item.id_photo === i);
    setSelected(pick[0]);
  };
  useEffect(() => {
    dispatch(getAllPictures());
    dispatch(getAlbum());
  }, []);

  const setAlbumId = (i) => {
    dispatch(selectedAlbum({ ...album, id_album: i }));
  };

  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          <AddPicture />
          {photos &&
            photos.map((i) => (
              <Button
                key={i.id_photo}
                variant="link"
                onClick={() => handlePickPhoto(i.id_photo)}
              >
                <Picture
                  url={i.url}
                  title={i.title}
                  description={i.description}
                />
              </Button>
            ))}
          {selected && (
            <ModalForm
              selected={selected}
              setSelected={setSelected}
              title={selected.title}
              description={selected.description}
            />
          )}

          {albumList?.map((i) => (
            <div className="album">
              <Link key={"link" + i.id_album} to={`/album`}>
                <Button
                  className="albumButton"
                  variant="link"
                  key={i.id_album}
                  onClick={() => setAlbumId(i.id_album)}
                >
                  <Col>
                    <FontAwesomeIcon
                      icon={faCameraRetro}
                      style={{ fontSize: "3rem" }}
                    />
                    <p>Album {i.name}</p>
                  </Col>
                </Button>
              </Link>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};
