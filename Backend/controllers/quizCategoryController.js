const asyncHandler = require("express-async-handler");
const Category = require("../models/postCategoryModel");

const getcategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();

    if (!categories) {
        res.status(400).json({ message: "no category found" });
        return;
        
    }

    res.json(categories);
});

const getcategory = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const category = await Category.findById(id);

    if (!category) {
        res.status(400).json({ message: `category with ${id} doesnt exist ` });
        return;
        
    }

    res.status(200).json(category);
});

const addcategory = asyncHandler(async (req, res) => {
    const { title, description } = req.body;


    if(!title || !description){
        res.status(400).json({ message: "fill all fields!" });
        return;
    }
    const categoryExist = await Category.findOne({ title });

    if (categoryExist) {
        res.status(400).json({ message: "category already exist!" });
        return;
        
    }
    const newCategory = await Category.create({
        title:title,
        description:description,
    });

    if (!newCategory) {
        res.status(400).json({ message: "error creating new category" });
        return;
        
    }

    res.status(201).json(newCategory);
});

const updatecategory = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;

    if (!title || !description) {
        res.status(400).json({ message: "fill all description!" });
        return;
        
    }
    const categoryExist = await Category.findById(id);
    if (!categoryExist) {
        res.status(400).json({ message: "category not found" });
        return;
        
    }

    const upatedCategory = await Category.findByIdAndUpdate(
        id,
        {
            title: title,
            description: description,
        },
        {
            new: true,
        }
    );

    res.status(200).json(upatedCategory);
});

const deleteategory = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const deletedData = await Category.findByIdAndDelete(id);

    if (!deletedData) {
        res.status(400).json({ message: `category with ${id} doesnt exist ` });
        return;
        
    }

    res.status(200).json(deletedData);
});

module.exports = {
    getcategories,
    getcategory,
    addcategory,
    updatecategory,
    deleteategory,
};
