const pool = require("../database/config");

const userAlbums = async (idUser) => {
  const { rows: albums } = await pool.query(
    "SELECT * FROM album WHERE id_user = $1",
    [idUser]
  );

  if (albums.rowCount === 0) {
    return { answer: "User has no albums yet" };
  }

  return {
    answer: "ok",
    albums: albums,
  };
};
module.exports = { userAlbums };
