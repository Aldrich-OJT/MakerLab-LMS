const mongoose = require("mongoose")


const questionSchema = new mongoose.Schema(
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
        },
        quiz: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Quiz", 
            required: [true, "Please specify a category"],
          },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Question",questionSchema)