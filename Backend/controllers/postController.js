const Post = require("../models/postModel");
const asyncHandler = require("express-async-handler");
const Category = require("../models/postCategoryModel");
const fs = require("fs");
const path = require("path");
const UserData = require("../models/userDataModel");
// const recalculateProgress = require('../Helper/recalculateProgress');


const recalculateProgress = (userdata, postcount) => {
    let newprogress = 0;
    //find all quizscores that are passed then divide to the total quizcount then return the recalculated value
    const filteredquizzes = userdata.quizScores.filter(item => item.passed === true)
    const currentprogress = parseFloat(userdata.progress);
    console.log(filteredquizzes.length, postcount)
    const calculatedprogress = filteredquizzes.length / postcount;


    if (currentprogress !== 0) {
        newprogress = calculatedprogress;
    }

    return newprogress;
};


//get posts from a specific category
const getposts = asyncHandler(async (req, res) => {
    const categoryID = req.params.categoryID;

    const posts = await Post.find({ category: categoryID }).lean().exec();

    if (!posts) {
        res.status(400).json({ message: "no post found" });
        return;

    }

    res.status(200).json(posts);
});

//getting all count of the posts from database
const getallpostcount = asyncHandler(async (req, res) => {
    {
        const count = await Post.countDocuments()
        res.status(200).json(count)
    }
})

//get all posts from database
const getallpost = asyncHandler(async (req, res) => {
    {
        const count = await Post.find()

        if (!count) {
            res.status(400).json({ message: "no post found" })
        }

        res.status(200).json(count)

    }
})

//not used, saved for later
//get the file from database
const getpostfile = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id);

    const filePath = path.join(__dirname, "..", post.documentPath)


    if (!post) {
        res.status(400).json({ message: "no post found" });
        return;

    }

    res.status(200).download(filePath, (err) => {
        if (err) {
            res.status(400).json({ message: "error downloading file" })
        }
    });
});

//get specific post
const getpost = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const post = await Post.findById(id);

    if (!post) {
        res.status(400).json({ message: "no post found" });
        return;

    }

    res.status(200).json(post)
});


//add posts to database and recalculate progress
const addpost = asyncHandler(async (req, res) => {
    const { userId, title, categoryID, description } = req.body;
    const document = req.file;
    console.log("this is my userid", userId)

    //console.log(document)
    if (!document || !title || !description || !userId) {
        res.status(400).json({ message: "Fill all data" });
        return;

    }

    const documentExist = await Post.findOne({ documentName: document.filename });
    //console.log("this is found userdata",userdata)
    if (documentExist) {
        res.status(400).json({ message: "document Already Exist" });
        return

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
    const userdata = await UserData.findOne({ user: userId })

    if (!userdata) {
        res.status(404).json({ message: "no userid found" });
        return

    }

    const postcount = await Post.countDocuments()

    const updatedprogress = await UserData.findOneAndUpdate({ user: userId }, {
        progress: recalculateProgress(userdata, postcount)
    }, { new: true })

    console.log("updateduserdadta", updatedprogress)

    await Category.findByIdAndUpdate(categoryID, { $push: { posts: newPost._id } });

    res.status(200).json(newPost);
});
//update specific post in database
const updatepost = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    const document = req.file;

    const currpost = await Post.findById(id);

    if (!currpost) {
        res.status(400).json({ message: `post with id ${req.params.id} not found` });
        return;

    }

    //delete file from filesystem
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

//delete specific post and recalculate user progress
const deletepost = asyncHandler(async (req, res) => {
    const userId = req.query.userId;
    const id = req.params.id;
    const post = await Post.findById(id);

    if (!post) {
        return res.status(400).json({ message: "no post found" });
    }
    const filePath = post.documentPath;
    fs.unlink(filePath, (err) => {
        if (err) {
            return res.status(400).json({ message: `Error deleting document file ${err}` });
        } else {
            console.log(`${filePath} deleted successfully`);
        }
    });


    const deletedPost = await Post.findByIdAndDelete(id);

    const userdata = await UserData.findOne({ user: userId })
    const postcount = await Post.countDocuments()
    console.log(userId)
    const updatedprogress = await UserData.findOneAndUpdate({ user: userId }, {
        progress: recalculateProgress(userdata, postcount)
    }, { new: true })

    console.log("updateduserdadta", updatedprogress)



    await Category.findByIdAndUpdate(deletedPost.category, { $pull: { posts: id } });
    res.status(200).json(deletedPost);
});

module.exports = {
    getpostfile,
    getallpost,
    getposts,
    getallpostcount,
    getpost,
    addpost,
    updatepost,
    deletepost
};
