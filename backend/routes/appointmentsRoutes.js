const express = require("express");
const { authenticate: verify } = require("../middlewares/private");
const { newAppointment, getAllAppointments, getMyAppointments, getAppointmentDetails, deleteAppointment } = require("../controllers/appointments");

const router = express.Router();
router.post("/new-appointment", verify, newAppointment);
router.get("/all-appointments", verify, getAllAppointments);
router.get("/my-appointments", verify, getMyAppointments);
router.get("/appointment-details/:id", verify, getAppointmentDetails);
router.delete("/appointment/:id", verify, deleteAppointment);

module.exports = router;