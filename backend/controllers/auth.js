const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const BlacklistedToken = require("../models/blacklistedToken");
const User = require("../models/user");
const Pet = require("../models/pet");

const register = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body;
    if (!(firstName && lastName && email && password && role)) {
        res.status(400).send("All input fields are required.");
    }
    const oldUser = await User.findOne({ email });
    if (oldUser) {
        return res.status(400).send("User already exists. Please login.");
    }
    const salt = 10;
    const hashPassword = await bcrypt.hash(req.body.password, salt);
    const user = new User({
        firstName,
        lastName,
        email,
        password: hashPassword,
        role
    });

    try {
        await user.save();
        const token = jwt.sign({ email, role: user.role }, process.env.TOKEN_KEY, { expiresIn: "1h" });
        res.send({
            message: "You are now registered.",
            token: token,
            userId: user._id,
        });
        //     const petRegistrationPath = `/register-pet/${user._id}`;
        //     res.status(201).send({ message: "User registered. Now you can register your pet.", petRegistrationPath })
    } catch (err) {
        res.status(400);
    }
}

const login = async (req, res) => {
    const { email, password } = req.body;
    if (!(email && password)) {
        res.status(400).send("All input fields are required.");
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
        const tokenPayload = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }
        const token = jwt.sign(tokenPayload, process.env.TOKEN_KEY, { expiresIn: "1h" });
        res.header("Authorization", token).send({ message: "Logged in.", token: token });
    } else {
        res.status(400).send("Invalid e-mail or password.");
    }
}

const logout = async (req, res) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(400).send("Token not provided.");
    }

    try {
        const justToken = token.replace("Bearer ", "");

        const blacklistedToken = new BlacklistedToken({ token: justToken });
        await blacklistedToken.save();

        res.send("Logout successful.");
    } catch (err) {
        res.status(400).send("Error logging out.");
    }
}

const petRegistration = async (req, res) => {
    const { userId } = req.params;
    const { name, type, breed, age } = req.body;

    if (!(name, type, breed, age)) {
        res.status(400).send("All input fields are required.");
    }

    try {
        const pet = new Pet({ name, breed, type, age, owner: userId });
        await pet.save();
        res.status(201).send({ pet });
    } catch (err) {
        res.status(400).send("Error while registering your pet. Please try again.");
    }

}

module.exports = { register, login, logout, petRegistration };