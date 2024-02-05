const User = require("../models/user");
const Appointment = require("../models/appointment");

const newAppointment = async (req, res) => {
    const { date, time, description, status } = req.body;
    const { userId } = req.params;

    if (!(date, time)) {
        res.status(400).send("Date and time are required.");
    }

    const appointment = new Appointment({
        date,
        time,
        description,
        status,
        user: userId
    });
    try {
        await appointment.save();
        res.send({
            message: "Appointment requested."
        })
    } catch (err) {
        res.status(400).send("Request for appointment failed. Please try again.");
    }
}

module.exports = { newAppointment }