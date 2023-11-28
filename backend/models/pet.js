const mongoose = require("mongoose");

const petSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    breed: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

const Pet = mongoose.model('Pet', petSchema, "pets");

module.exports = Pet;
