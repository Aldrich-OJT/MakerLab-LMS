const express = require("express")
const router = express.Router()
const {addQuiz,getAllQuiz,editQuiz,deleteQuiz} = require("../controllers/quizController")
const { protect } = require("../middleware/authMiddleware")

router.post('/add',protect,addQuiz)
router.get('/',protect,getAllQuiz)
router.put('/update/:id',protect,editQuiz)
router.delete('/delete/:id',protect,deleteQuiz)


module.exports = router;