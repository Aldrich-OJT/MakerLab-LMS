const mongoose = require("mongoose");

const quizScoreSchema = new mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post', 
        required:true
    },
    categoryId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
        required:true
    },
    postName:{
        type: String,
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
        type: Number,
    },
    progress: {
        type: mongoose.Decimal128,
        default: 0
    },
    badges:[{
        type: String
    }],
    quizScores: [quizScoreSchema]

});

const UserData = mongoose.model("UserData", userDataSchema);

module.exports = UserData;