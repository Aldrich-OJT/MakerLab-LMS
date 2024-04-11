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
        type: Number,
        default: 0
    },
    quizScores: [quizScoreSchema]

});

const UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;