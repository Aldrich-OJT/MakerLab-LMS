const mongoose = require("mongoose")



const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        documentPath: {
            type: String,
            required: [true, 'Please add a document path']
        },
        documentName:{
            type: String,
            required: [true, 'Please add a document name']
        },
        documentType:{
            type: String,
            required: [true, 'Please add a document type']
        },
        description:{
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

module.exports = mongoose.model("Post", postSchema)