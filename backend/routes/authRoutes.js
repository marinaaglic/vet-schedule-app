const express = require("express");
const { register, login, logout, petRegistration, validateToken } = require("../controllers/auth");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.post("/register-pet/:userId", petRegistration);
router.post("/auth/validate-token", validateToken)

module.exports = router;