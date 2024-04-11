const asyncHandler = require('express-async-handler')
const Question = require("../models/questionModel")
const Post = require('../models/postModel')



// const handleQuizError = async(question, options, answer,res)=>{
//     const questionExist = await Quiz.findOne({question})

//     if(questionExist){
//         //res.status(400).json({message: "question already exist"})
//         throw new Error("question already exist")
//     }

//     if(options.length < 4 || options.length > 4 ){
//     // res.status(400).json({message: "options must not be less than and greater than 4"})
//         throw new Error("provide all options")
//     }`
//     if(!options.includes(answer)){
//         //res.status(400).json({message: "answer is not included in the choices"})
//         throw new Error("answer is not included in the choices")
//     }
//     if(new Set(options).size !== options.length){
//     // res.status(400).json({message: "there is duplication in the choices"})
//         throw new Error("there is duplication in the choices")
//     }
//     if(!question || !options || !answer){
//     // res.status(400).json({message: "please fill all fields"})
//         //throw new Error("please fill all fields")
//     }

// }
const addQuestion = asyncHandler(async (req, res) => {

    const { question, options, answer, postID} = req.body

    const questionExist = await Question.findOne({ question })

    if (questionExist) {
        //res.status(400).json({message: "question already exist"})
        res.status(400)
        throw new Error("question already exist")
    }

    if (options.length < 4 || options.length > 4) {
        res.status(400)
        // res.status(400).json({message: "options must not be less than and greater than 4"})
        throw new Error("provide all options")
    }
    if (!options.includes(answer)) {
        //res.status(400).json({message: "answer is not included in the choices"})
        res.status(400)
        throw new Error("answer is not included in the choices")
    }
    if (new Set(options).size !== options.length) {
        // res.status(400).json({message: "there is duplication in the choices"})
        res.status(400)
        throw new Error("there is duplication in the choices")
    }
    if (!question || !options || !answer) {
        res.status(400)
        // res.status(400).json({message: "please fill all fields"})
        throw new Error("please fill all fields")
    }

    

    const newQuestion = await Question.create({
        question: question,
        options: options,
        answer: answer,
        post: postID
    })

    await Post.findByIdAndUpdate(postID, { $push: { questions: newQuestion._id } })

    if (newQuestion) {
        res.status(201).json(newQuestion)
    }
})
const getAllQuestion = asyncHandler(async (req, res) => {
    const data = await Question.find()

    if (data) {
        res.status(200).json(data)
    } else {
        res.status(400)
        throw new Error("no data")
    }
})

const getQuestions = asyncHandler(async (req, res) => {
    const id = req.params.postID
    console.log(id)
    const questions = await Question.find({post: id})

    if(!questions){
        res.status(400)
        throw new Error(`no post found`)
    }else{
        res.status(200).json(questions)
    }

    
})

const editQuestion = asyncHandler(async (req, res) => {
    const { question, options, answer } = req.body
    const id = req.params.id
    const idExist = await Question.findById(id)

    if (!idExist) {
        res.status(400)
        throw new Error("id dont exist")
    }

    // const questionExist = await Question.findOne({ question })

    // if (questionExist) {
    //     //res.status(400).json({message: "question already exist"})
    //     throw new Error("question already exist")
    // }

    if (options.length < 4 || options.length > 4) {
        // res.status(400).json({message: "options must not be less than and greater than 4"})
        res.status(400)
        throw new Error("provide all options")
    }
    if (!options.includes(answer)) {
        //res.status(400).json({message: "answer is not included in the choices"})
        res.status(400)
        throw new Error("answer is not included in the choices")
    }
    if (new Set(options).size !== options.length) {
        // res.status(400).json({message: "there is duplication in the choices"})
        res.status(400)
        throw new Error("there is duplication in the choices")
    }
    if (!question || !options || !answer) {
        // res.status(400).json({message: "please fill all fields"})
        res.status(400)
        throw new Error("please fill all fields")
    }
    const newQuestion = await Question.findByIdAndUpdate(id, {
        question: question,
        options: options,
        answer: answer
    }, { new: true })

    res.status(200).json({ newQuestion })
})

const deleteQuestion = asyncHandler(async (req, res) => {

    const question = await Question.findById(req.params.id)

    if (!question) {
        res.status(400)
        throw new Error("id does not exist")
    }
    const { _id } = await Question.findByIdAndDelete(req.params.id)

    await Post.findByIdAndUpdate(question.post, { $pull: { questions: _id } })

    res.status(200).json(_id)

})

module.exports = {
    addQuestion,
    getQuestions,
    getAllQuestion,
    editQuestion,
    deleteQuestion
}