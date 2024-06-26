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
        res.status(400).json({ message: "Invalid user Data" });
        return;
    }
});

const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ email });

    if (userExist) {
        res.status(400).json({ message: "User already exist" });
        return;
        
    }

    if (!name || !email || !password) {
        res.status(400).json({ message: "Please fill out all input" });
        return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);
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
        res.status(400).json({ message: "Invalid user Data" });
        return;
    }
});

const getUser = asyncHandler(async (req, res) => {
    const { id, name, email, role } = await User.findById(req.user.id)

    res.status(200).json({
        id: id,
        name: name,
        email: email,
        role: role,
    })
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
}

const getalluserData = asyncHandler(async (req, res) => {
    const users = await User.find({ role: 'user' }, 'name email');

    if (!users || users.length === 0){
        res.status (400).json({message: "No users found"})
    }
    res.status(200).json(users);
})
module.exports = {
    userLogin,
    userRegister,
    getUser,
    getalluserData,
};
