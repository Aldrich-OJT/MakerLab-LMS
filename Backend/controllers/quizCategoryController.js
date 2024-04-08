const asyncHandler = require("express-async-handler")
const Category = require("../models/quizCategoryModel")


const getcategories = asyncHandler(async(req,res)=>{
    const categories = await Category.find()

    if(!categories){
        //res.status(400).json({message:"no category found"})
        throw new Error("no category found")
    }

    res.json(categories)

})
const getcategory = asyncHandler(async(req,res)=>{
    const id = req.params.id

    const category = await Category.findById(id)

    if(!category){
        throw new Error(`category with ${id} doesnt exist `)
    }

    res.status(200).json(category)

})

const addcategory = asyncHandler(async(req,res)=>{
    const {title, description} = req.body

    const categoryExist = await Category.findOne({title})

    if(categoryExist){
        //res.status(400).json({message: "category already exist!"})
        throw new Error("category already exist!")
    } 

    const newCategory = await Category.create({
        title,
        description,
    })

    if(!newCategory){
        res.status(400).json({message:"error creating new category"})
    }

    res.status(201).json(newCategory)
    
})
const updatecategory = asyncHandler(async(req,res)=>{
    const id = req.params.id
    const {title, description} = req.body

    const category = await Category.findByIdAndUpdate(id,{
        title,
        description
    },
    {
        new:true
    })
    if(!category){
        throw new Error(`category with ${id} doesnt exist `)
    }
    res.status(200).json(category)
})
const deleteategory = asyncHandler(async(req,res)=>{
    const id = req.params.id

    const deletedData = await Category.findByIdAndDelete(id)

    if(!deletedData){
        throw new Error(`category with ${id} doesnt exist `)
    }

    res.status(200).json(deletedData)

    
})

module.exports= {
    getcategories,
    getcategory,
    addcategory,
    updatecategory,
    deleteategory
}