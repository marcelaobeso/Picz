const {
  createRelation,
  createRelationAndAlbum,
} = require("../models/Relations");

const createRel = async (req, res = response) => {
  try {
    const dbAns = await createRelation(req.body);

    if (dbAns.answer === "ok") {
      res.json({
        ok: true,
        albums: dbAns.albums,
      });
    } else {
      res.status(400).json({
        ok: false,
        msg: dbAns.answer,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ups unable to get albums from user",
    });
  }
};

const createAlAnRel = async (req, res = response) => {
  try {
    const dbAns = await createRelationAndAlbum(req.body);

    if (dbAns.answer === "ok") {
      res.json({
        ok: true,
        albums: dbAns.albums,
      });
    } else {
      res.status(400).json({
        ok: false,
        msg: dbAns.answer,
      });
    }
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Ups unable to create this album from user",
    });
  }
};

module.exports = { createRel, createAlAnRel };
