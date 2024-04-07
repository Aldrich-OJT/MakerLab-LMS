const mongoose = require("mongoose")
const questionModel = require("./questionModel")


const quizSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true
        },
        category:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        },
    },
    {
        timestamps:true
    }
)

module.exports = mongoose.model("Quiz", quizSchema)