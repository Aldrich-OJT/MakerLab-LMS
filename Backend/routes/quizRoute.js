const express = require("express")
const router = express.Router()

const { getquiz,getquizzes,addquiz,updatequiz,deletequiz } = require("../controllers/quizController")
const { protect } = require("../middleware/authMiddleware")

router.get("/category/:categoryID",getquizzes)
router.get("/:id",getquiz)
router.post("/add",addquiz)
router.put("/update/:id",updatequiz)
router.delete("/delete/:id",deletequiz)


module.exports = router
