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
        const appointments = await Appointment.find({ user: req.user._id });
        res.send(appointments);
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
}

const getAppointmentDetails = async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send("Appointment ID is required.");
    }
    try {
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            return res.status(404).send("Appointment not found.");
        }

        res.send(appointment)
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
}

const deleteAppointment = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await Appointment.findByIdAndDelete(id);

        if (!appointment) {
            return res.status(404).send("Appointment not found.");
        }
        res.send("Appointment deleted successfully.");
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
}

const updateAppointment = async (req, res) => {
    const { id } = req.params;
    const data = req.body;

    const appointment = {
        date: data.date,
        time: data.time,
        description: data.description,
    }

    try {
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, appointment, { new: true });
        res.send(updatedAppointment);
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
}
module.exports = { newAppointment, getAllAppointments, getMyAppointments, getAppointmentDetails, deleteAppointment, updateAppointment }