const express = require("express")
const router = express.Router()
const {postVideo, getVideo, deleteVideo, updateVideo} = require("../controllers/videoController")
const {protect} = require("../middleware/authMiddleware")

router.post("/upload", protect,postVideo)
router.get("/get", protect ,getVideo)
router.put("/update", protect,deleteVideo)
router.delete("/delete", protect,updateVideo)

module.exports = router