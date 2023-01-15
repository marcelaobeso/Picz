import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
export const Picture = ({ url, description, title }) => {
  return (
    <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 1, 900: 1 }}>
      <Masonry>
        <img src={url} alt="title" />
      </Masonry>
    </ResponsiveMasonry>
  );
};
