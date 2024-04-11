const mongoose = require("mongoose");

const quizScoreSchema = new mongoose.Schema({
    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz', 
        required: true
    },
    score: {
        type: Number,
        default: 0 
    }
});

const userDataSchema = new mongoose.Schema({
    avatar: {
        type: String,
        required: true
    },
    progress: {
        type: Number,
        default: 0
    },
    quizScores: [quizScoreSchema]
});

const UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;