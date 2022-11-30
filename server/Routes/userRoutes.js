const express = require("express");
const router = express.Router();
const { registerUser, authuser } = require("../controller/userController");

router.route("/").post(registerUser);

router.post("/login", authuser);

module.exports = router;