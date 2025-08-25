const express = require("express");
const router = express.Router();
const { userLogin, userSignUp } = require("../controllers");
const {
  loginValidation,
  signupValidation,
} = require("../middlewares/authValidation");

router.post("/login", loginValidation, userLogin);
router.post("/signup", signupValidation, userSignUp);

module.exports = router;
