const asyncHandler = require('express-async-handler');
const Question = require("../models/questionModel");
const Post = require('../models/postModel');

const addQuestion = asyncHandler(async (req, res) => {

    const { question, options, answer, postID } = req.body;

    const questionExist = await Question.findOne({ question });

    if (questionExist) {
        res.status(400).json({ message: "Question already exists" });
        return;
    }

    if (options.length !== 4) {
        res.status(400).json({ message: "Provide exactly 4 options" });
        return;
    }

    if (!options.includes(answer)) {
        res.status(400).json({ message: "Answer is not included in the options" });
        return;
    }

    if (new Set(options).size !== options.length) {
        res.status(400).json({ message: "There are duplicate options" });
        return;
    }

    if (!question || !options || !answer) {
        res.status(400).json({ message: "Please fill all fields" });
        return;
    }

    const newQuestion = await Question.create({
        question: question,
        options: options,
        answer: answer,
        post: postID
    });

    await Post.findByIdAndUpdate(postID, { $push: { questions: newQuestion._id } });

    res.status(201).json(newQuestion);
});

const getAllQuestion = asyncHandler(async (req, res) => {
    const data = await Question.find();

    if(!data){
        res.status(404).json("no question found")
        return;
    }

    res.status(200).json(data);
});

const getQuestions = asyncHandler(async (req, res) => {
    const id = req.params.postID;
    const questions = await Question.find({ post: id });

    res.status(200).json(questions);
});

const editQuestion = asyncHandler(async (req, res) => {
    const { question, options, answer } = req.body;
    const id = req.params.id;

    const idExist = await Question.findById(id);
    if (!idExist) {
        res.status(400).json({ message: "Question not found" });
        return;
    }

    if (options.length !== 4) {
        res.status(400).json({ message: "Provide exactly 4 options" });
        return;
    }

    if (!options.includes(answer)) {
        res.status(400).json({ message: "Answer is not included in the options" });
        return;
    }

    if (new Set(options).size !== options.length) {
        res.status(400).json({ message: "There are duplicate options" });
        return;
    }

    if (!question || !options || !answer) {
        res.status(400).json({ message: "Please fill all fields" });
        return;
    }

    const newQuestion = await Question.findByIdAndUpdate(id, {
        question: question,
        options: options,
        answer: answer
    }, { new: true });

    res.status(200).json({ newQuestion });
});

const deleteQuestion = asyncHandler(async (req, res) => {

    const question = await Question.findById(req.params.id);

    if (!question) {
        res.status(400).json({ message: "Question not found" });
        return;
    }

    const { _id } = await Question.findByIdAndDelete(req.params.id);

    await Post.findByIdAndUpdate(question.post, { $pull: { questions: _id } });

    res.status(200).json({ message: "Question deleted successfully", id: _id });
});

module.exports = {
    addQuestion,
    getQuestions,
    getAllQuestion,
    editQuestion,
    deleteQuestion
};
