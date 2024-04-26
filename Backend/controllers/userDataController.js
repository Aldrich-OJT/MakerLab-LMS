const asyncHandler = require("express-async-handler");
const UserData = require("../models/userDataModel");
const Category = require("../models/postCategoryModel")
const getuserData = asyncHandler(async (req, res) => {
    const id = req.params.userID;

    const user = await UserData.findOne({ user: id });

    if (!user) {
        res.status(400).json({ message: "No user found" });
        return;
    }
    res.status(200).json(user);
});
const getalluserData = asyncHandler(async (req, res) => {
    const users = await UserData.findOne();

    if (!users) {
        res.status(400).json({ message: "No user found" });
        return;
    }
    res.status(200).json(users);
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
    const { avatar, progress, quizScores, categoryId, postId } = req.body;

    console.log("work")
    console.log(avatar)

    const data = await UserData.findOne({ user: id });

    //console.log(data.quizScores)

    const calculateProgress = () => {
        let newprogress = 0
        //console.log(data.progress)
        //find if the incoming quizscore has the same id with with the existing in the database
        const indexToUpdate = data.quizScores.findIndex(item => item.postId.toString() === quizScores.postId)
        //if it finds that there is quiz and if it is passed it will add to the progress else will subtract

        console.log("index to update", indexToUpdate)
        if (indexToUpdate >= 0) {
            //console.log(data.quizScores[indexToUpdate].passed)

            if (quizScores.passed === false && data.quizScores[indexToUpdate].passed === true) {
                console.log("minus")
                newprogress = (parseFloat(data.progress) - parseFloat(progress))

            } else if (quizScores.passed === true && data.quizScores[indexToUpdate].passed === false) {
                console.log("add")
                newprogress = (parseFloat(data.progress) + parseFloat(progress))
            }else{
                newprogress = data.progress
            }
        } else {

            if (quizScores.passed === true) {
                console.log("add new")
                newprogress = parseFloat(data.progress) + progress

            }else{
                console.log("retain")
                newprogress = data.progress
            }
           

            //console.log(newquizscore)
        }
        //console.log(newprogress)
        return newprogress
    }

    const getQuizScores = () => {
        let newquizscore

        // console.log("check for same data")
        // find the index to be update checks if the postname are equal and database and in the new data
        const indexToUpdate = data.quizScores.findIndex(item => item.postName === quizScores.postName)
        //console.log("i want to update this", indexToUpdate)
        if (indexToUpdate >= 0) {
            //console.log("update new")
            data.quizScores[indexToUpdate] = {
                ...data.quizScores[indexToUpdate],  // Keep other properties unchanged
                ...quizScores  // Update properties with new data
            };
            newquizscore = data.quizScores
        } else {
           //if not index found just add the quizscores to existing
            const newdata = [...data.quizScores, quizScores]
            newquizscore = newdata
            //console.log(newquizscore)
        }


        //newquizscore = quizScores

        return newquizscore
    }

    const updatedUserData = await UserData.findByIdAndUpdate(
        data._id,
        {
            user: data.user,
            avatar: avatar != undefined ? avatar : data.avatar,
            progress: progress ? calculateProgress() : data.progress,
            quizScores: quizScores ? getQuizScores() : data.quizScores

            //completedAssessments: setCompletedAssessments()

        },
        { new: true }
    );
    if (!updatedUserData) {
        res.status(400).json({ message: "No user found" });
        return;
    }
    //console.log(updatedUserData.avatar)
    res.status(200).json(updatedUserData);
});

const getUserDataWithCategory = asyncHandler(async (req, res) => {
    const id = req.params.id
    const userData = await UserData.findOne({ user: id })
        .populate({
            path: 'quizScores',
            populate: {
                path: 'categoryId',
                model: 'Category',
                select: 'title _id'
            }
        })
        .exec();

    console.log(userData)
})

module.exports = {
    getUserDataWithCategory,
    getalluserData,
    getuserData,
    updateuserData,
    adduserData,
};
