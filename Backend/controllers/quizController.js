const { json } = require("body-parser")
const Quiz = require("../models/quizModel")
const asyncHandler = require("express-async-handler")
const Category = require("../models/quizCategoryModel")



const getquizzes = asyncHandler(async(req,res)=>{
    
    const categoryID = req.params.categoryID
    console.log(categoryID)

    const quizzes = await Quiz.find({category: categoryID})

    if(!quizzes){
        throw new Error(`no quiz found`)
    }

    res.status(200).json(quizzes)

})
const getquiz = asyncHandler(async(req,res)=>{
    const id = req.params.id

    const quiz = await Quiz.findById(id)

    if(!quiz){
        throw new Error(`no quiz by ${id} found`)
    }

    res.status(200).json(quiz)
})
const addquiz = asyncHandler(async(req,res)=>{
    const { name, categoryID,description } = req.body
    
    if (!name || !categoryID) {
        throw new Error("Please fill all fields: name, categoryID")
    }


    const newQuiz = await Quiz.create({
        name: name,
        description: description,
        category: categoryID,
        
    })

    if (!newQuiz) {
        throw new Error("Failed to create quiz")
    }

    // Associate the newly created quiz with the corresponding category
    await Category.findByIdAndUpdate(categoryID, { $push: { quizzes: newQuiz._id } })

    res.status(200).json(newQuiz)
});

const updatequiz = asyncHandler(async(req,res)=>{
    const id = req.params.id
    const {name} = req.body

    const quizexist = await Quiz.findById(id);
    if (!quizexist) {
        throw new Error(" quiz doesnt exist")
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(id,{name:name});
     res.status(200).json(updatedQuiz)
})

const deletequiz = asyncHandler(async (req, res) => {
    const id = req.params.id;

  
    const deletedQuiz = await Quiz.findById(id);
    if (!deletedQuiz) {
        throw new Error("no quiz found")
    }

    const {_id} = await Quiz.findByIdAndDelete(id);

    await Category.findByIdAndUpdate(deletedQuiz.category, { $pull: { quizzes: id } });

    res.status(200).json(_id);
 
});


module.exports = {
    getquizzes,
    getquiz,
    addquiz,
    updatequiz,
    deletequiz


}