const pool = require("../database/config");

const createRelation = async (info) => {
  const { id_album, id_photo } = info;
  const { rows: check } = await pool.query(
    "SELECT id_photo FROM relationship WHERE id_album = $1",
    [id_album]
  );
  if (check[0].id_photo === id_photo) {
    return { answer: "already linked to this album" };
  }
  await pool.query(
    "INSERT INTO relationship (id_album, id_photo) VALUES($1, $2)",
    [id_album, id_photo]
  );
  return {
    answer: "added to album",
  };
};

const createRelationAndAlbum = async (info) => {
  const { name, id_photo, idUser } = info;
  const { rowCount } = await pool.query(
    "SELECT name FROM album WHERE name = $1 and id_user = $2",
    [name, idUser]
  );
  if (rowCount !== 0) {
    return { answer: "we alerady have and album with this name" };
  }
  await pool.query("INSERT INTO album (name, id_user) VALUES($1, $2)", [
    name,
    idUser,
  ]);
  const { rows } = await pool.query(
    "SELECT id_album FROM album WHERE name = $1 and id_user = $2",
    [name, idUser]
  );
  const id_album = rows[0].id_album;
  await pool.query(
    "INSERT INTO relationship (id_album, id_photo) VALUES($1, $2)",
    [id_album, id_photo]
  );
  return {
    answer: "added to album",
  };
};
module.exports = { createRelation, createRelationAndAlbum };
