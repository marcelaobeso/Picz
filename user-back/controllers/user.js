const { response } = require("express");
const { getUserInfo } = require("../models/User");
// const bcrypt = require("bcryptjs");
// const { generateJWT } = require("../helpers/jwt");

const getUser = async ({ params }, res = response) => {
  //errors handler

  try {
    const dbAns = await getUserInfo(params);
    if (dbAns.answer === "ok") {
      res.status(201).json({
        ok: true,
        msg: "User Info",
        idUser: dbAns.idUser,
        username: dbAns.username,
        firstName: dbAns.firstname,
        lastName: dbAns.lastname,
        email: dbAns.email,
        token: dbAns.token,
        gravatar: dbAns.gravatar,
        biography: dbAns.biography,
      });
    } else {
      res.status(400).json({
        ok: false,
        msg: dbAns.answer,
      });
    }
  } catch (e) {
    res.status(500).json({
      ok: false,
      msg: e,
    });
  }
};

module.exports = { getUser };
