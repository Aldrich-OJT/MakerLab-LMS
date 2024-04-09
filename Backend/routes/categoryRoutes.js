const express = require("express")
const router = express.Router()

const { addcategory, getcategory, getcategories, deleteategory, updatecategory } = require("../controllers/quizCategoryController")
const { protect } = require("../middleware/authMiddleware")

router.get("/",protect,getcategories)
router.get("/:id",protect,getcategory)
router.post("/add",protect,addcategory)
router.put("/update/:id",protect,updatecategory)
router.delete("/delete/:id",protect,deleteategory)


module.exports = router
