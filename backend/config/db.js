const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoURL = process.env.mongoURL;
const PORT = process.env.PORT || 8080;

mongoose.connect(mongoURL, {
    dbName: "vet-clinic",
})
    .then((result) => {
        console.log("Connected to database");
    })
    .catch((error) => {
        console.log("Error when connecting to database: ", error);
    });
