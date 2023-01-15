import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import NavigationBar from "../../Navbar/NavigationBar";
import { Picture } from "../Picture";

export const AlbumView = () => {
  return (
    <>
      <NavigationBar />
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 3, 750: 3, 900: 3 }}>
        <Masonry>
          <Picture />
        </Masonry>
      </ResponsiveMasonry>
    </>
  );
};
