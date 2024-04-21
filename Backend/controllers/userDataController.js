const asyncHandler = require("express-async-handler");
const UserData = require("../models/userDataModel");

const getuserData = asyncHandler(async (req, res) => {
    const id = req.params.userID;

    const user = await UserData.findOne({ user: id });

    if (!user) {
        res.status(400).json({ message: "No user found" });
        return;
    }
    res.status(200).json(user);
});

const adduserData = asyncHandler(async (req, res) => {
    const userID = req.params.userID;
    console.log(userID);
    if (!userID) {
        res.status(400).json({ message: "Please provide userID" });
        return;
    }

    const newUserData = await UserData.create({
        user: userID,
    });

    res.status(200).json(newUserData);
});

const updateuserData = asyncHandler(async (req, res) => {
    id = req.params.userID;
    const { avatar, progress, quizScores } = req.body;

    console.log(quizScores)

    const data = await UserData.findOne({ user: id });

    console.log(data)

    const calculateProgress = ()=>{
        let newprogress = 0
        if (quizScores.passed === true) {
            newprogress = (parseFloat(data.progress) + parseFloat(progress))
        }else{
            newprogress = (parseFloat(data.progress) - parseFloat(progress))
        }
        console.log(newprogress)
        return newprogress
    }

    const updatedUserData = await UserData.findByIdAndUpdate(
        data._id,
        {
            user: data.user,
            avatar: avatar ? avatar : data.avatar,
            progress: progress ? calculateProgress() : data.progress,
            quizScores: quizScores ? quizScores : data.quizScores,
        },
        { new: true }
    );
    if (!updatedUserData) {
        res.status(400).json({ message: "No user found" });
        return;
    }

     res.status(200).json(updatedUserData);
});

module.exports = {
    getuserData,
    updateuserData,
    adduserData,
};
