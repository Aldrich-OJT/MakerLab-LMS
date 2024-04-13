const express = require("express")
const router = express.Router()
const {addQuestion,getAllQuestion,editQuestion,deleteQuestion, getQuestions} = require("../controllers/questionController")
const { protect } = require("../middleware/authMiddleware")

router.post('/add',addQuestion)
router.get('/',getAllQuestion)
router.get('/:postID',getQuestions)
router.put('/update/:id',editQuestion)
router.delete('/delete/:id',deleteQuestion)


module.exports = router;