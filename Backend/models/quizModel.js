const mongoose = require("mongoose")


const quizSchema = new mongoose.Schema(
    {
        question:{
            type:String,
            required:[true,]
        }
    

    }
)