const jwt = require("jsonwebtoken");
const User = require("../models/user");
const BlacklistedToken = require("../models/blacklistedToken");

const authenticate = async (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).send("Access denied.");
    }
    try {
        const justToken = token.replace("Bearer ", "");

        const isTokenBlacklisted = await BlacklistedToken.findOne({ token: justToken });
        if (isTokenBlacklisted) {
            return res.status(401).send("Token revoked. Please log in again.");
        }

        const verified = jwt.verify(justToken, process.env.TOKEN_KEY);
        const user = await User.findOne({ email: verified.email });

        if (!user) {
            return res.status(404).send("User not found.");
        }

        req.user = {
            _id: user._id,
            firstName: verified.firstName,
            lastName: verified.lastName,
            email: verified.email,
            role: verified.role
        };
        next();
    } catch (err) {
        res.status(400).send(`Invalid token. Error: ${err.message}`);
    }
}

module.exports = { authenticate };
