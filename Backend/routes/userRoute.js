const express = require('express');
const router = express.Router();
const { userLogin, userRegister, getUser } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware')

router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/me", protect,getUser);

module.exports = router; 