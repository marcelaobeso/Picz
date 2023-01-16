const pool = require("../database/config");
// const bcrypt = require("bcryptjs");
// const { generateJWT } = require("../helpers/jwt");

const getUserInfo = async ({ id }) => {
  console.log(id);
  const userCheck = await pool.query("SELECT* FROM PERSON WHERE id_user = $1", [
    id,
  ]);
  if (userCheck.rowCount === 0) {
    return { answer: "user not in db" };
  }
  console.log(userCheck.rows[0]);
  return {
    answer: "ok",
    idUser: userCheck.rows[0].id_user,
    username: userCheck.rows[0].username,
    idUser: userCheck.rows[0].id_user,
    email: userCheck.rows[0].email,
    firstname: userCheck.rows[0].firstname,
    lastname: userCheck.rows[0].lastname,
    biography: userCheck.rows[0].biografy,
    gravatar: userCheck.rows[0].gravatar,
  };
};

module.exports = { getUserInfo };
