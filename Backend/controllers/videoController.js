const asyncHandler = require("express-async-handler")
const Post = require("../models/postModel")

const postVideo = asyncHandler( async(req, res)=>{
    const {file} = req.file
    const {title, description} = req.body

    if(!file || !title || !description){
        res.status(400).json({ message: 'Fill all data' });
        throw new Error ("fill all data")
    }

    const newPost = Post.create({
        videoPath: file.path,
        title: title,
        description: description,

    })

}) 
const getVideo = asyncHandler( async(req, res)=>{
    

}) 

const updateVideo = asyncHandler( async(req, res)=>{
    

}) 

const deleteVideo = asyncHandler( async(req, res)=>{
    

}) 

module.exports ={
    postVideo,
    getVideo,
    updateVideo,
    deleteVideo,
}