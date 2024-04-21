const mongoose = require("mongoose");

const quizScoreSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', 
    },
    score: {
        type: Number,
        default: 0 
    },
    passed:{
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Date,
      }
});

const userDataSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    avatar: {
        type: String,
    },
    progress: {
        type: mongoose.Decimal128,
        default: 0
    },
    badges:[{
        type: String
    }],
    completedAssessments:[{

    }],
    finishedLessons:[{

    }],
    quizScores: [quizScoreSchema]

});

const UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;