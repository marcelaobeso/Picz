import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getAllPictures } from "../../store/slices/pictureSlice/thunk";
import { AddPicture } from "./AddPicture/AddPicture";
import { Album } from "./album/Album";
import { ModalForm } from "./Description/ModalForm";
import { Picture } from "./Picture";

export const Pictures = () => {
  const [selected, setSelected] = useState(null);

  const { photos } = useSelector((state) => state.picture);
  const dispatch = useDispatch();
  const handlePickPhoto = (i) => {
    const pick = photos.filter((item) => item.id_photo === i);
    setSelected(pick[0]);
  };
  useEffect(() => {
    dispatch(getAllPictures());
  }, []);

  return (
    <>
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry>
          <AddPicture />
          {photos &&
            photos.map((i) => (
              <>
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
                {selected && (
                  <ModalForm
                    key={"mod" + i.id_photo}
                    selected={selected}
                    setSelected={setSelected}
                    title={i.title}
                    description={i.description}
                  />
                )}
              </>
            ))}

          <Album />
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};
