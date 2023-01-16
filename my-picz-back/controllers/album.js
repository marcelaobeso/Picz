const { getAllRelations } = require("../models/Relations");

const albumPicz = async ({ id }, res = response) => {
  try {
    const dbAns = await getAllRelations(id);
    if (dbAns.answer === "ok") {
      res.json({
        ok: true,
        photos: dbAns.photos,
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
      msg: "Ups unable to get pics for this album",
    });
  }
};
module.exports = { albumPicz };
