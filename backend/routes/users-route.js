const express = require("express");
const { check } = require("express-validator");
const userController = require("../controller/user-controller");
const router = express.Router();

router.get("/", userController.getAllUsers);
router.get("/:uid", userController.getUserById);
router.post(
  "/signup",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  userController.signUp
);
router.post(
  "/login",
  [
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  userController.login
);


module.exports = router;
