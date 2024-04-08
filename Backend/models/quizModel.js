const mongoose = require("mongoose")



const quizSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true
        },
        questions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
        }]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Quiz", quizSchema)