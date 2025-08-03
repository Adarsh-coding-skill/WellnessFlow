const express = require('express');
const { login, register, logout, getProfile } = require("../controller/authController.js");
const { isAuthenticated } = require('../Middleware/authMiddleware.js');
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/getuser", isAuthenticated,  getProfile);
module.exports = router;