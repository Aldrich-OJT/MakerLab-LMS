    const asyncHandler = require('express-async-handler')
    const Quiz = require("../models/quizModel")


    // const handleQuizError = async(question, options, answer,res)=>{
    //     const questionExist = await Quiz.findOne({question})

    //     if(questionExist){
    //         //res.status(400).json({message: "question already exist"})
    //         throw new Error("question already exist")
    //     }

    //     if(options.length < 4 || options.length > 4 ){
    //     // res.status(400).json({message: "options must not be less than and greater than 4"})
    //         throw new Error("provide all options")
    //     }
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
    const addQuiz = asyncHandler(async(req, res)=>{

        const {question, options, answer} = req.body

        const questionExist = await Quiz.findOne({question})

        if(questionExist){
            //res.status(400).json({message: "question already exist"})
            throw new Error("question already exist")
        }

        if(options.length < 4 || options.length > 4 ){
        // res.status(400).json({message: "options must not be less than and greater than 4"})
            throw new Error("provide all options")
        }
        if(!options.includes(answer)){
            //res.status(400).json({message: "answer is not included in the choices"})
            throw new Error("answer is not included in the choices")
        }
        if(new Set(options).size !== options.length){
        // res.status(400).json({message: "there is duplication in the choices"})
            throw new Error("there is duplication in the choices")
        }
        if(!question || !options || !answer){
        // res.status(400).json({message: "please fill all fields"})
            throw new Error("please fill all fields")
        }


        const newQuiz = await Quiz.create({
            question: question,
            options: options,
            answer: answer
        })

        if(newQuiz){
            res.status(201).json(newQuiz)
        }
    })
    const getAllQuiz = asyncHandler(async(req, res)=>{
        const data = await Quiz.find()
        
        if(data){
            res.status(200).json(data)
        }else{
            res.status(400).json({message: "no data"})
            throw new Error("no data")
        }
    })

    const editQuiz = asyncHandler(async(req, res)=>{
        const {question, options, answer} = req.body
        const id = req.params.id
        const idExist = await Quiz.findById(id)
        
        if(!idExist){
            res.status(400).json({message:"id does not exist"})
            throw new Error("no data")
        }

        const questionExist = await Quiz.findOne({question})

        if(questionExist){
            //res.status(400).json({message: "question already exist"})
            throw new Error("question already exist")
        }

        if(options.length < 4 || options.length > 4 ){
        // res.status(400).json({message: "options must not be less than and greater than 4"})
            throw new Error("provide all options")
        }
        if(!options.includes(answer)){
            //res.status(400).json({message: "answer is not included in the choices"})
            throw new Error("answer is not included in the choices")
        }
        if(new Set(options).size !== options.length){
        // res.status(400).json({message: "there is duplication in the choices"})
            throw new Error("there is duplication in the choices")
        }
        if(!question || !options || !answer){
        // res.status(400).json({message: "please fill all fields"})
            throw new Error("please fill all fields")
        }
        const newQuiz = await Quiz.findByIdAndUpdate(id,{
            question: question,
            options: options,
            answer: answer
        }, {new:true})

        res.status(200).json({newQuiz})
    })

    const deleteQuiz = asyncHandler(async(req, res)=>{
        
        const idExist = await Quiz.findById(req.params.id)

        if(!idExist){
            throw new Error("id does not exist")
        }
        const {_id} = await Quiz.findByIdAndDelete(req.params.id)
        res.status(200).json(_id)
        
    })

    module.exports = {
        addQuiz,
        getAllQuiz,
        editQuiz,
        deleteQuiz
    }