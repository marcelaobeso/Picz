const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {
  fieldsValidator,
} = require("../controllers/middlewares/fieldsValidation.js");

const { validateJWT } = require("../controllers/middlewares/JWTValidator.js");
const {
  uploadPicture,
  getPictures,
  getAlbum,
} = require("../controllers/upload.js");
const Multer = require("multer");
const { createRel, createAlAnRel } = require("../controllers/relations.js");
const multer = Multer({
  storage: Multer.memoryStorage(),
});

router.post(
  "/picture",
  [
    //middlewares
    // check("idUser", "idUser is mandatory").not().isEmpty(),
    fieldsValidator,
  ],
  validateJWT,
  multer.single("file"),
  uploadPicture
);
router.get(
  "/picture",
  [
    //middlewares
    check("idUser", "idUser is mandatory").not().isEmpty(),
    fieldsValidator,
  ],
  validateJWT,
  getPictures
);
router.get(
  "/album",
  [
    //middlewares
    check("idUser", "idUser is mandatory").not().isEmpty(),
    fieldsValidator,
  ],
  validateJWT,
  getAlbum
);
router.post(
  "/album",
  [
    //middlewares
    check("id_album", "id_album is mandatory").not().isEmpty(),
    check("id_photo", "id_photo is mandatory").not().isEmpty(),
    fieldsValidator,
  ],
  validateJWT,
  createRel
);
router.post(
  "/newAlbum",
  [
    //middlewares
    check("idUser", "idUser is mandatory").not().isEmpty(),
    check("name", "name is mandatory").not().isEmpty(),
    check("id_photo", "id_photo is mandatory").not().isEmpty(),
    fieldsValidator,
  ],
  validateJWT,
  createAlAnRel
);

module.exports = router;
