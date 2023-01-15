const { response } = require("express");
const { uploadCloud } = require("../helpers/uploadCloudStorage");
const { userAlbums } = require("../models/Album");
const { addPhoto, getPhotos } = require("../models/Photo");

const uploadPicture = async (req, res = response) => {
  try {
    const info = await uploadCloud(req);
    const dbAns = await addPhoto(info);
    if (dbAns.answer === "ok") {
      res.json({
        ok: true,
        msg: "uploaded",
        info: info,
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
      msg: "Ups unable to upload this file",
    });
  }
};
const getPictures = async ({ id }, res = response) => {
  try {
    const dbAns = await getPhotos(id);
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
      msg: "Ups unable to get pics from user",
    });
  }
};
const getAlbum = async ({ id }, res = response) => {
  try {
    const dbAns = await userAlbums(id);

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

module.exports = { uploadPicture, getPictures, getAlbum };
