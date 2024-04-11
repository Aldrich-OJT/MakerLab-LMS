const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true
        },
        posts:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post"
        }]
    },
    {
        timestamps: true    
    }
);

module.exports = mongoose.model("Category", categorySchema);