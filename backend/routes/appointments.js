const express = require("express");
const { authenticate: verify } = require("../middlewares/private");
const { newAppointment } = require("../controllers/appointments");

const router = express.Router();
router.post("/new-appointment", verify, newAppointment);

module.exports = router;