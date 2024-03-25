const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const asyncHandler = require('express-async-handler');

const userLogin = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            role: user.role
        });
    } else {
        res.status(400).json({ message: 'Invalid user Data' });
        throw new Error("Invalid user Data")
    }
});

const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400).json({ message: 'User already exists' });
        return;
    }

    if (!name || !email || !password) {
        res.status(400).json({ message: "Please fill out all input" });
        throw new Error("Please fill out all input")
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
a
    const newUser = await User.create({
        name,
        email,
        password: hashedPass,
    });

    if (newUser) {
        console.log(newUser)
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id),
            role: newUser.role
        });
    } else {
        res.status(400).json({ message: "Please fill out all input" });
        throw new Error("Invalid user Data")
    }
});

const getUser = asyncHandler(async (req, res) => {
    const {id, name, email, role} =  await User.findById(req.user.id)

    res.status(200).json({
        id: id,
        name: name,
        email: email,
        role: role,
    })
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '7d'
    });
}

module.exports = {
    userLogin,
    userRegister,
    getUser,
};