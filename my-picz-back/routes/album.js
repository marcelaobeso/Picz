const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const { albumPicz } = require("../controllers/album.js");
const {
  fieldsValidator,
} = require("../controllers/middlewares/fieldsValidation.js");

const { validateJWT } = require("../controllers/middlewares/JWTValidator.js");

router.get(
  "/pictures",
  [
    //middlewares
    check("id_album", "id_album is mandatory").not().isEmpty(),
    fieldsValidator,
  ],
  validateJWT,
  albumPicz
);

module.exports = router;
