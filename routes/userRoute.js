const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userCtrl");

//router object
const router = express.Router();

//routers

// POST || LOGIN USER
router.post("/Login", loginController);

//POST || REGISTER USER
router.post("/SignUp", registerController);

module.exports = router;