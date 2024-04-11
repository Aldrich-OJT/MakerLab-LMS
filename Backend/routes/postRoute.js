const express = require("express")
const router = express.Router()

const { getpost,getposts,addpost,updatepost,deletepost } = require("../controllers/postController")
const { protect } = require("../middleware/authMiddleware")
const { singleUpload } = require("../middleware/multerMiddleware")


router.get("/category/:categoryID",getposts)
router.get("/:id",getpost)
router.post("/add",[singleUpload, protect],addpost)
router.put("/update/:id",[singleUpload, protect],updatepost)
router.delete("/delete/:id",deletepost)


module.exports = router
