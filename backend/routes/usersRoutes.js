const express = require("express");
const { authenticate: verify } = require("../middlewares/private");
const { getUserInfo } = require("../controllers/users");

const router = express.Router();
router.get("/user", verify, getUserInfo);

module.exports = router;