const express = require("express");
const router = express.Router();

const {register, login, logout} = require("../controllers/userController.js");
// const { login, register, logout, getUser } = require("../controllers/userController.js");
const { isAuthenticated } = require("../middlewares/auth.js");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", isAuthenticated, logout);
// router.get("/getuser", isAuthenticated, getUser);

module.exports = router;