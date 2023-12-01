const express = require("express");
const { register, login, logout, petRegistration } = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/register-pet/:userId", petRegistration);

module.exports = router;