const express = require("express")
const router = express.Router()
const {addQuestion,getAllQuestion,editQuestion,deleteQuestion, getQuestions} = require("../controllers/questionController")
const { protect } = require("../middleware/authMiddleware")

router.post('/add',protect,addQuestion)
router.get('/',protect,getAllQuestion)
router.get('/:postID',protect,getQuestions)
router.put('/update/:id',protect,editQuestion)
router.delete('/delete/:id',protect,deleteQuestion)


module.exports = router;