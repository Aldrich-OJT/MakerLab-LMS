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
        post: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post", 
            required: [true, "Please specify a post"],
        },
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Question",questionSchema)