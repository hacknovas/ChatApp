const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateTokent = require("../config/generateToken");

const registerUser = async (req, res) => {
    const { name, email, password, pic } = req.body;

    if (!name || !email || !password) {
        throw new Error("Please Enter All fields");
    }

    const userExist = await User.findOne({ email });

    if (userExist) {
        userExist.status(400);
        throw new Error("User Already created");
    }

    const user = await User.create({
        name, email, password, pic
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateTokent(user._id),
        })
    } else {
        res.status(400);
        throw new Error("User Not Found");
    }
}


const authuser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPass(password))) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateTokent(user._id),
        })
    }
}

module.exports = { registerUser, authuser }