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
  const {
    idUser,
    email,
    username,
    password,
    gravatar,
    bio,
    firstName,
    lastName,
  } = req;

  const emailCheck = await pool.query(
    "SELECT* FROM PERSON WHERE EMAIL = $1 OR username = $2",
    [email, username]
  );

  if (emailCheck.rowCount !== 0 && emailCheck.rows[0].id_user !== idUser) {
    return { answer: "email or username already in database " };
  }
  await pool.query(
    "UPDATE PERSON SET username = $1, email = $2 WHERE id_user = $3;",
    [username, email, idUser]
  );
  // firstName,
  console.log(firstName);
  if (firstName) {
    const res = await pool.query(
      "UPDATE PERSON SET firstname = $1 WHERE id_user = $2",
      [firstName, idUser]
    );
  }
  // lastName,
  lastName &&
    (await pool.query("UPDATE PERSON SET lastname = $1 WHERE id_user = $2", [
      lastName,
      idUser,
    ]));
  // password,
  password &&
    (await pool.query("UPDATE PERSON SET password = $1 WHERE id_user = $2", [
      password,
      idUser,
    ]));
  // bio,
  bio &&
    (await pool.query("UPDATE PERSON SET biografy = $1 WHERE id_user = $2", [
      bio,
      idUser,
    ]));
  // gravatar,
  gravatar &&
    (await pool.query("UPDATE PERSON SET gravatar = $1 WHERE id_user = $2", [
      gravatar,
      idUser,
    ]));
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
  const token = await generateJWT(
    userCheck.rows[0].id_user,
    userCheck.rows[0].email
  );

  return {
    answer: "ok",
    token: token,
    idUser: userCheck.rows[0].id_user,
    email: userCheck.rows[0].email,
    firstname: userCheck.rows[0].firstname,
    lastname: userCheck.rows[0].lastname,
    biografy: userCheck.rows[0].biografy,
    gravatar: userCheck.rows[0].gravatar,
  };
};
module.exports = { addUser, loginUser, updateUser };
