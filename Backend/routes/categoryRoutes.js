const express = require("express")
const router = express.Router()

const { addcategory, getcategory, getcategories, deletecategory, updatecategory } = require("../controllers/quizCategoryController")
const { protect } = require("../middleware/authMiddleware")

router.get("/",getcategories)
router.get("/:id",getcategory)
router.post("/add",addcategory)
router.put("/update/:id",updatecategory)
router.delete("/delete/:id",deletecategory)


module.exports = router
