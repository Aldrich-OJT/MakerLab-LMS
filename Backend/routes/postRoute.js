const express = require("express")
const router = express.Router()

const { getallpostcount ,getpostfile, getpost,getposts,addpost,updatepost,deletepost } = require("../controllers/postController")
const { protect } = require("../middleware/authMiddleware")
const { singleUpload } = require("../middleware/multerMiddleware")


router.get("/category/:categoryID",getposts)
router.get("/id/:id",getpost)
router.get("/count",getallpostcount)
router.get("/download/:id",getpostfile)
router.post("/add",[singleUpload ],addpost)
router.put("/update/:id",[singleUpload],updatepost)
router.delete("/delete/:id",deletepost) 


module.exports = router
