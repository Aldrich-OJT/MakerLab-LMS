const asyncHandler = require("express-async-handler")
const fs = require("fs")
const Post = require("../models/postModel")

const postsingleVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    const singleVideo = req.file

    if (!singleVideo || !title || !description) {
        res.status(400).json({ message: 'Fill all data' })
        throw new Error("Fill all data")
    }

    const videoExist = await Post.findOne({ videoName: singleVideo.filename })

    if (videoExist) {
        console.log("Video was blocked")
        res.status(400).json({ message: 'Video Already Exist' })
        throw new Error('Video Already Exist')
    }

    const newPost = new Post({
        videoPath: singleVideo.path,
        videoName: singleVideo.filename,
        title: title,
        description: description
    });

    const savedPost = await newPost.save()
    res.status(201).json(savedPost)
});


// const postmultipleVideo = asyncHandler(async (req, res) => {
//     const { title, description } = req.body
//     const multipleVideos = req.files

//     if (!multipleVideos || !title || !description) {
//         res.status(400).json({ message: 'Fill all data' })
//         throw new Error("Fill all data")
//     }

//     // if (!Array.isArray(title) || !Array.isArray(description) || title.length !== multipleVideos.length || description.length !== multipleVideos.length) {
//     //     res.status(400).json({ message: 'Number of titles/descriptions does not match the number of uploaded files' })
//     //     throw new Error("Number of titles/descriptions does not match the number of uploaded files")
//     // }

//     const existingVideo = await Post.find({ videoName: { $in: multipleVideos.map(video => video.filename) } })


//     if (existingVideo) {
//         console.log("Video was blocked");
//         res.status(400).json({ message: 'One or more videos already exist' });
//         throw new Error('One or more videos already exist');
//     }

//     const newPosts = multipleVideos.map((video, index) => new Post({
//         videoPath: video.path,
//         videoName: video.filename,
//         title: title[index],
//         description: description[index]
//     }));

//     const savedPosts = await Post.insertMany(newPosts)
//     res.status(201).json(savedPosts);
// });
const getVideo = asyncHandler(async (req, res) => {
    const videoId = req.params.id;

    const video = await Post.findById(videoId);

    if (!video) {
        res.status(404).json({ message: "Video not found" });
        throw new Error("Video not found");
    }

    res.json({ video });
});
const getAllVideos = asyncHandler(async (req, res) => {
    const videos = await Post.find();

    if (!videos || videos.length === 0) {
        res.status(404).json({ message: "There are no videos" });
        throw new Error("There are no videos");
    }
    res.json({ videos });

});const updateVideo = asyncHandler(async (req, res) => {
    const currvideo = await Post.findById(req.params.id);
    const { title, description } = req.body;
s
    if (!currvideo) {
        throw new Error(`Video with id ${req.params.id} not found`);
    }

    
    if (!title || !description) {
        throw new Error("Please provide title and description to update");
    }

    // Update the video document
    const updatedVideo = await Post.findByIdAndUpdate(
        req.params.id,
        { title, description }, // Update only title and description fields
        { new: true } // Return the updated document
    );

    res.status(200).json({ updatedVideo });
});

const deleteVideo = asyncHandler(async (req, res) => {
    const video = await Post.findById(req.params.id);
    const filePath = video.videoPath;

    if (!video) {
        res.status(404).json({ message: `Video with id ${req.params.id} not found` });
        throw new Error("Video not found");
    }

    await Post.findByIdAndDelete(req.params.id);

    // Delete the associated video file from the filesystem
    
    fs.unlink(filePath, (err) => {
        if (err) {
            throw new Error(`Error deleting video file${err}`);
        } else {
            console.log(`Video file ${filePath} deleted successfully`);
        }
    });
})

module.exports = {
    postsingleVideo,
    // postmultipleVideo,
    getVideo,
    updateVideo,
    deleteVideo,
    getAllVideos
}