const mongoose = require("mongoose");

const appointmentSchema = mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: "pending"
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const Appointment = mongoose.model("Appointment", appointmentSchema, "appointments");

module.exports = Appointment;