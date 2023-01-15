const pool = require("../database/config");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const addUser = async (req) => {
  const { email, password, username, gravatar } = req;

  const emailCheck = await pool.query(
    "SELECT* FROM PERSON WHERE EMAIL = $1 OR username = $2",
    [email, username]
  );

  if (emailCheck.rowCount !== 0) {
    return { answer: "email or username already in database " };
  }

  await pool.query(
    "INSERT INTO PERSON (EMAIL, PASSWORD, USERNAME, GRAVATAR) VALUES($1, $2, $3, $4);",
    [email, password, username, gravatar]
  );
  const { rows } = await pool.query("SELECT* FROM PERSON WHERE email = $1", [
    email,
  ]);
  const token = await generateJWT(rows[0].id_user, rows[0].email);
  return {
    answer: "ok",
    idUser: rows[0].id_user,
    token: token,
    email: rows[0].email,
  };
};

const updateUser = async (req) => {
  console.log("here");
  const {
    email,
    password,
    username,
    gravatar,
    bio,
    firstName,
    lastName,
    idUser,
  } = req;
  const emailCheck = await pool.query(
    "SELECT* FROM PERSON WHERE EMAIL = $1 OR username = $2",
    [email, username]
  );

  if (emailCheck.rowCount !== 0 && emailCheck.rows[0].id_user !== idUser) {
    console.log("not same user");
    return { answer: "email or username already in database " };
  }
  await pool.query(
    "UPDATE PERSON SET username = $1, firstname = $2, lastname = $3, email = $4, password = $5, biografy = $6, gravatar = $7 WHERE id_user = $8",
    [username, firstName, lastName, email, password, bio, gravatar, idUser]
  );
  const { rows } = await pool.query("SELECT* FROM PERSON WHERE id_user = $1", [
    idUser,
  ]);
  return {
    answer: "ok",
    idUser: rows[0].id_user,
  };
};

const loginUser = async (req) => {
  const { username, password } = req;
  const userCheck = await pool.query(
    "SELECT* FROM PERSON WHERE username = $1",
    [username]
  );
  if (userCheck.rowCount === 0) {
    return { answer: "User or password are incorrect" };
  }

  const hashPass = bcrypt.compareSync(password, userCheck.rows[0].password);
  if (!hashPass) {
    return { answer: "User or password are incorrect" };
  }
  console.log(userCheck);
  const token = await generateJWT(
    userCheck.rows[0].id_user,
    userCheck.rows[0].email
  );

  return {
    answer: "ok",
    token: token,
    idUser: userCheck.rows[0].id_user,
    email: userCheck.rows[0].email,
    id_user: 3,
    firstname: userCheck.rows[0].firstname,
    lastname: userCheck.rows[0].lastname,
    biografy: userCheck.rows[0].biografy,
    gravatar: userCheck.rows[0].gravatar,
  };
};
module.exports = { addUser, loginUser, updateUser };
