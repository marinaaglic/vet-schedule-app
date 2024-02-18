const User = require("../models/user");
const Pet = require("../models/pet");

const getUserInfo = async (req, res) => {
    try {
        const userId = req.user._id;

        const userInfo = await User.findById(userId);
        if (!userInfo) {
            return res.status(404).send("User not found.");
        }

        const petInfo = await Pet.find({ owner: userId });

        res.status(200).json({ user: userInfo, pets: petInfo });
    } catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).send("Internal Server Error");
    }
}

module.exports = { getUserInfo };
