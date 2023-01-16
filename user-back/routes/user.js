/*
Login routes for users 
host + /api/auth
*/
const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");
const {
  fieldsValidator,
} = require("../controllers/middlewares/fieldsValidation.js");
const { validateJWT } = require("../controllers/middlewares/JWTValidator.js");
const { getUser } = require("../controllers/user.js");

router.get(
  "/:id",
  // validateJWT,
  //[check("idUser", "idUser is mandatory").not().isEmpty(), fieldsValidator],
  getUser
);

module.exports = router;
