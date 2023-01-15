import React from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Album = () => {
  const { albumList } = useSelector((state) => state.album);

  const setAlbumId = () => {};
  return (
    <>
      {albumList?.map((i) => (
        <Link to={`/album`}>
          <Button key={i.id_album} onClick={setAlbumId}>
            {i.name}
          </Button>
        </Link>
      ))}
    </>
  );
};
