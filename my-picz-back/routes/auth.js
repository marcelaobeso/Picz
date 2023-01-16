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
const {
  createUser,
  logUser,
  renewUser,
  updateUserFields,
} = require("../controllers/auth.js");
const { validateJWT } = require("../controllers/middlewares/JWTValidator.js");

router.post(
  "/sign",
  [
    //middlewares
    check("gravatar", "gravatar is mandatory").not().isEmpty(),
    check(
      "password",
      "password is mandatory and must be 6 caracters length minimun"
    ).isLength({ min: 6 }),
    check(
      "username",
      "username is mandatory and must be 6 caracters length minimun"
    ).isLength({ min: 6 }),
    check("email", "email is mandatory").isEmail(),
    fieldsValidator,
  ],
  createUser
);
router.post(
  "/login",
  [
    //middlewares
    check("username", "username must be entered").not().isEmpty(),
    check("password", "password must be entered").not().isEmpty(),
    fieldsValidator,
  ],

  logUser
);
router.put(
  "/update",
  [
    //middlewares
    check("idUser", "idUser must be entered").not().isEmpty(),
    check("username", "username must be entered").not().isEmpty(),
    check("email", "email must be entered").not().isEmpty(),
    fieldsValidator,
  ],
  validateJWT,
  updateUserFields
);

router.get(
  "/renew",
  [
    //middlewares
    check("token", "no token to validate").not().isEmpty(),
  ],
  validateJWT,
  renewUser
);

module.exports = router;
