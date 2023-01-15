const pool = require("../database/config");

const addPhoto = async ({ name, title, image, description, idUser }) => {
  const resp = await pool.query(
    "INSERT INTO photo (url, name, description, title, id_user) VALUES($1, $2, $3, $4, $5);",
    [image, name, description, title, idUser]
  );
  return {
    answer: "ok",
  };
};
const getPhotos = async (idUser) => {
  const { rows: photos } = await pool.query(
    "SELECT * FROM photo WHERE id_user = $1",
    [idUser]
  );
  if (photos.rowCount === 0) {
    return { answer: "User has no photos yet" };
  }

  return {
    answer: "ok",
    photos,
  };
};
module.exports = { addPhoto, getPhotos };
