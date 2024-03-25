const express = require("express")
const router = express.Router()
const { postsingleVideo, postmultipleVideo, getVideo, getAllVideos, deleteVideo, updateVideo } = require("../controllers/videoController")
const { protect } = require("../middleware/authMiddleware")
const { singleUpload, multipleUpload } = require('../middleware/multerMiddleware')


router.post("/upload", [singleUpload, protect], postsingleVideo);
router.post("/upload-multiple", [multipleUpload, protect], postmultipleVideo);
router.get("/videos", protect, getAllVideos);  
router.get("/:id", protect, getVideo);        
router.put("/update/:id", protect, updateVideo);
router.delete("/delete/:id", protect, deleteVideo); 


module.exports = router