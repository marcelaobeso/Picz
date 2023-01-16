import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectedAlbum } from "../../../store/slices/albumSlice/albumSlice";

export const Album = () => {
  const { albumList, album } = useSelector((state) => state.album);

  const dispatch = useDispatch();
  const setAlbumId = (i) => {
    dispatch(selectedAlbum({ ...album, id_album: i }));
  };
  return (
    <>
      {albumList?.map((i) => (
        <Link to={`/album`}>
          <Button key={i.id_album} onClick={setAlbumId(i.id_album)}>
            {i.name}
          </Button>
        </Link>
      ))}
    </>
  );
};
