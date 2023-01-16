import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { getRelations } from "../../../store/slices/albumSlice/thunk";
import NavigationBar from "../../Navbar/NavigationBar";
import { Picture } from "../Picture";

export const AlbumView = () => {
  const { photos } = useSelector((state) => state.picture);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRelations());
  }, []);

  return (
    <>
      <NavigationBar />
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 3, 750: 3, 900: 3 }}>
        <Masonry>
          {photos &&
            photos.map((i) => (
              <Picture
                key={i.id_photo}
                url={i.url}
                title={i.title}
                description={i.description}
              />
            ))}
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};
// {/* <>
//                 <Button
//                   key={i.id_photo}
//                   variant="link"
//                   onClick={() => handlePickPhoto(i.id_photo)}
//                 >
// </Button>
//                 {selected && (
//                   <ModalForm
//                     key={"mod" + i.id_photo}
//                     selected={selected}
//                     setSelected={setSelected}
//                     title={i.title}
//                     description={i.description}
//                   />
//                 )}
//               </> */}
