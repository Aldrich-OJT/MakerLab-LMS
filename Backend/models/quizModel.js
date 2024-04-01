const mongoose = require("mongoose")


const quizSchema = new mongoose.Schema(
    {
        question:{
            type:String,
            required:[true,"Please add question"]
        },
        options:{
            type:Array,
            required:[true,"Please add choices"]
        },
        answer:{
            type:String,
            required:[true,"Please add an answer"]
        }
    

    }
)

module.exports = mongoose.model("Quiz",quizSchema)