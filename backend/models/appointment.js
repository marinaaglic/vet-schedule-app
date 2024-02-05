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
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
})

const Appointment = mongoose.model("Appointment", appointmentSchema, "appointments");

module.exports = Appointment;