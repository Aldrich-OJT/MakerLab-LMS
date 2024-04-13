const asyncHandler = require("express-async-handler");
const UserData = require("../models/userDataModel");

const getuserData = asyncHandler(async (req, res) => {
    const id = req.params.userID;

    const user = await UserData.find({ user: id });

    if (!user) {
        res.status(400).json({ message: "No user found" });
    }
    res.status(200).json(user);
});

const adduserData = asyncHandler(async (req, res) => {
    const userID = req.params.userID;
    console.log(userID);
    if (!userID) {
        res.status(400).json({ message: "Please provide userID" });
    }

    const newUserData = await UserData.create({
        user: userID,
    });

    res.status(200).json(newUserData);
});

const updateuserData = asyncHandler(async (req, res) => {
    id = req.params.id;
    const { avatar, progress, quizScores } = req.body;

    const data = await UserData.find({ user: id });

    const updatedUserData = await UserData.findByIdAndUpdate(
        id,
        {
            user: data.user,
            avatar: avatar ? avatar : data.avatar,
            progress: progress ? progress : data.progress,
            quizScores: quizScores ? quizScores : data.quizScores,
        },
        { new: true }
    );
    if (!updatedUserData) {
        res.status(400).json({ message: "No user found" });
    }

    res.status(200).json(updatedUserData);
});

module.exports = {
    getuserData,
    updateuserData,
    adduserData,
};
