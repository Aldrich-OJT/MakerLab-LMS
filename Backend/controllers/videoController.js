// const asyncHandler = require("express-async-handler");
// const fs = require("fs");
// const Post = require("../models/mkpostModel");

// const postsingleVideo = asyncHandler(async (req, res) => {
//     const { title, description } = req.body;
//     const singleVideo = req.file;

//     if (!singleVideo || !title || !description) {
//         res.status(400).json({ message: 'Fill all data' });
        
        
//     }

//     const videoExist = await Post.findOne({ documentName: singleVideo.filename });

//     if (videoExist) {
//         res.status(400).json({ message: 'Video Already Exist' });
        
//     }

//     const newPost = new Post({
//         documentPath: singleVideo.path,
//         documentName: singleVideo.filename,
//         documentType: singleVideo.mimetype,
//         title: title,
//         description: description
//     });

//     const savedPost = await newPost.save();
//     res.status(201).json(savedPost);
// });

// const getVideo = asyncHandler(async (req, res) => {
//     const videoId = req.params.id;

//     const video = await Post.findById(videoId);

//     if (!video) {
//         res.status(404).json({ message: "Video not found" });
//         ;
//     }

//     res.json({ video });
// });

// const getAllVideos = asyncHandler(async (req, res) => {
//     const videos = await Post.find();

//     if (!videos || videos.length === 0) {
//         res.status(404).json({ message: "There are no videos" });
//         ;
//     }
//     res.json(videos);
// });

// const updateVideo = asyncHandler(async (req, res) => {
//     const currvideo = await Post.findById(req.params.id);
//     const { title, description } = req.body;
//     const document = req.file;
//     const filePath = currvideo.documentPath;

//     if (!currvideo) {
//         res.status(404).json({ message: `Video with id ${req.params.id} not found` });
        
//     }

//     if (!title || !description) {
//         res.status(400).json({ message: "Please provide title and description to update" });
        
//     }

//     fs.unlink(filePath, (err) => {
//         if (err) {
//             res.status(500).json({ message: `Error deleting video file: ${err}` });
            
//         } else {
//             console.log(`Video file ${filePath} deleted successfully`);
//         }
//     });

//     const updatedVideo = await Post.findByIdAndUpdate(
//         req.params.id,
//         { 
//             documentName: document.filename,
//             documentPath: document.path,
//             documentType: document.mimetype,
//             title: title,
//             description:description
//         }, 
//         { new: true }
//     );

//     res.status(200).json(updatedVideo);
// });

// const deleteVideo = asyncHandler(async (req, res) => {
//     const video = await Post.findById(req.params.id);
//     const filePath = video.documentPath;

//     if (!video) {
//         res.status(404).json({ message: `Video with id ${req.params.id} not found` });
        
//     }

//     fs.unlink(filePath, (err) => {
//         if (err) {
//             res.status(500).json({ message: `Error deleting video file: ${err}` });
            
//         } else {
//             console.log(`${filePath} deleted successfully`);
//         }
//     });

//     const {_id} = await Post.findByIdAndDelete(req.params.id);

//     res.status(200).json(_id);
// });

// module.exports = {
//     postsingleVideo,
//     getVideo,
//     updateVideo,
//     deleteVideo,
//     getAllVideos
// };
