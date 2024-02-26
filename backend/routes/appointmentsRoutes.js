const express = require("express");
const { authenticate: verify } = require("../middlewares/private");
const { newAppointment, getAllAppointments, getMyAppointments, getAppointmentDetails } = require("../controllers/appointments");

const router = express.Router();
router.post("/new-appointment", verify, newAppointment);
router.get("/all-appointments", verify, getAllAppointments);
router.get("/my-appointments", verify, getMyAppointments);
router.get("/appointment-details/:id", verify, getAppointmentDetails);

module.exports = router;