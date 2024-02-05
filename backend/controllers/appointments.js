const User = require("../models/user");
const Appointment = require("../models/appointment");

const newAppointment = async (req, res) => {
    const { date, time, description, status } = req.body;

    if (!(date, time)) {
        res.status(400).send("Date and time are required.");
    }

    const appointment = new Appointment({
        date,
        time,
        description,
        status,
        user: req.user._id
    });
    try {
        await appointment.save();
        res.send({
            message: "Appointment requested."
        })
    } catch (err) {
        res.status(400).send(`Request for appointment failed. Error: ${err.message}`);;
    }
}

const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find();
        res.send(appointments);
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
}

const getMyAppointments = async (req, res) => {
    try {
        const appointment = await Appointment.find({ user: req.user._id });
        res.send(appointment);
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
}

module.exports = { newAppointment, getAllAppointments, getMyAppointments }