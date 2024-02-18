const express = require("express");
const { authenticate: verify } = require("../middlewares/private");
const { newAppointment, getAllAppointments, getMyAppointments } = require("../controllers/appointments");

const router = express.Router();
router.post("/new-appointment", verify, newAppointment);
router.get("/all-appointments", verify, getAllAppointments);
router.get("/my-appointments", verify, getMyAppointments);

module.exports = router;