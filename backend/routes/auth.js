const express = require("express");
const { register, login, petRegistration } = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/register-pet/:userId", petRegistration);

module.exports = router;