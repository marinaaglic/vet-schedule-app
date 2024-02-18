require("./config/db");
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const appointmentRoutes = require("./routes/appointmentsRoutes");
const userRoutes = require("./routes/usersRoutes");

const app = express();

app.use(cors());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/appointments", appointmentRoutes);
app.use("/profile", userRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})

