const Post = require("../models/postModel");
const asyncHandler = require("express-async-handler");
const Category = require("../models/postCategoryModel");
const fs = require("fs");

const getposts = asyncHandler(async (req, res) => {
    const categoryID = req.params.categoryID;

    const posts = await Post.find({ category: categoryID });

    if (posts == 0) {
        res.status(400).json({ message: "no post found" });
        return;

    }

    res.status(200).json(posts);
});

const getpost = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const post = await Post.findById(id);

    if (!post) {
        res.status(400).json({ message: "no post found" });
        return;

    }

    res.status(200).json(post);
});

const addpost = asyncHandler(async (req, res) => {
    const { title, categoryID, description } = req.body;
    const document = req.file;


    if (!document || !title || !description) {
        res.status(400).json({ message: "Fill all data" });
        return;

    }

    const documentExist = await Post.findOne({ documentName: document.filename });

    if (documentExist) {
        res.status(400).json({ message: "document Already Exist" });

    }

    const newPost = await Post.create({
        title: title,
        documentPath: document.path,
        documentName: document.filename,
        documentType: document.mimetype,
        description: description,
        category: categoryID,
    });

    if (!newPost) {
        res.status(400).json({ message: "Failed to create Post" });
        return;

    }

    await Category.findByIdAndUpdate(categoryID, { $push: { posts: newPost._id } });

    res.status(200).json(newPost);
});

const updatepost = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    const document = req.file;

    const currpost = await Post.findById(id);

    if (!currpost) {
        res.status(400).json({ message: `post with id ${req.params.id} not found` });
        return;

    }

    if (document) {
        const filePath = currpost.documentPath;
        fs.unlink(filePath, (err) => {
            if (err) {
                res.status(400).json({ message: `Error deleting document file ${err}` });
                return;

            } else {
                console.log(`document file ${filePath} deleted successfully`);
            }
        });
    }

    const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
            title: title ? title : currpost.title,
            documentName: document?.filename,
            documentPath: document?.path,
            documentType: document?.mimetype,
            category: currpost.categoryID,
            description: description ? description : currpost.description
        },
        { new: true }
    );
    res.status(200).json(updatedPost);
});

const deletepost = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id);

    if (!post) {
        res.status(400).json({ message: "no post found" });
        return;

    }
    const filePath = post.documentPath;
    fs.unlink(filePath, (err) => {
        if (err) {
            res.status(400).json({ message: `Error deleting document file ${err}` });
            return;

        } else {
            console.log(`${filePath} deleted successfully`);
        }
    });

    const deletedPost = await Post.findByIdAndDelete(id);
    await Category.findByIdAndUpdate(deletedPost.category, { $pull: { posts: id } });
    res.status(200).json(deletedPost);
});

module.exports = {
    getposts,
    getpost,
    addpost,
    updatepost,
    deletepost
};
