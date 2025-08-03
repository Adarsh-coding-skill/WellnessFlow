const express = require('express');
const { login, register, logout, getProfile } = require("../controller/authController.js");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

module.exports = router;